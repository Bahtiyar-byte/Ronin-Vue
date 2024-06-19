<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useContacts } from '@/composables/useContacts'
import type Contact from '@/types/contacts/Contact'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldsContacts } from '@/utils/initial_data/initialFieldsContacts'

const { create: createContact, getById: getContactById, update: updateContact } = useContacts()
const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const isUpdateMode = ref(false)
const pageTitle = ref('Create Contact')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Contacts', to: { name: 'contacts' } },
  { title: 'New contact', disabled: true },
])

const { formFields, initializeFields } = useFormFields('contacts')
const contactRef = ref<Contact>()
const dataLoaded = ref(false)

const fetchContactData = async (id: string) => {
  const { data } = await getContactById(id)

  watch(data, (contact: Contact | null) => {
    if (contact === null) {
      return
    }

    contactRef.value = contact
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(contact, subField.name)) {
            subField.value = contact[subField.name]
          }
        })
      } else if (hasKey(contact, field.name)) {
        field.value = contact[field.name]
      }
    })
    pageTitle.value = `Update ${contact.name}`
    breadcrumbs.value[2] = { title: `Update ${contact.name}`, disabled: true }
  })
}

onBeforeMount(async () => {
  await initializeFields(initialFieldsContacts)

  const contactId = route.params.id as string
  if (contactId) {
    isUpdateMode.value = true
    await fetchContactData(contactId)
  }
  dataLoaded.value = true
})

useHead({
  title: computed(() => (isUpdateMode.value && contactRef.value ? `Edit ${contactRef.value.name}` : 'Create new contact')),
})

const submitForm = async (values: Record<string, any>) => {
  const contactData = { ...contactRef.value, ...values } as Contact
  const action = contactData.id ? updateContact : createContact
  const { data } = await action(contactData)

  watch(data, newVal => {
    router.push({ name: 'contacts-details-id', params: { id: newVal?.id as string } })
  })
}
</script>

<template>
  <ItemUpdate
    v-if="dataLoaded"
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
    :fields="formFields"
    :submit-handler="submitForm"
  />
</template>

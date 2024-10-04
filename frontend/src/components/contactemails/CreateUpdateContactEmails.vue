<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import type ContactEmail from '@/types/contactemails/ContactEmail'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldsContactEmails } from '@/utils/initial_data/initialFieldsContactEmails'
import type FormField from '@/types/forms/FormField'
import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import { useContactEmails } from '@/composables/useContactEmails'

const { create: createEmail, getById: getEmailById, update: updateEmail } = useContactEmails()
const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const isUpdateMode = ref(false)
const pageTitle = ref('Create Contact Email')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Contact Emails', to: { name: 'contactemails' } },
  { title: 'New Contact Email', disabled: true },
])

const { formFields, initializeFields } = useFormFields('contactemails')
const contactEmailRef = ref<ContactEmail>()
const dataLoaded = ref(false)

const fetchContactEmailData = async (id: string) => {
  const { data } = await getEmailById(id)

  watch(data, (contactEmail: ContactEmail | null) => {
    if (contactEmail === null) {
      return
    }

    contactEmailRef.value = contactEmail
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(contactEmail, subField.name)) {
            subField.value = contactEmail[subField.name]
            // if (subField.name === 'related_trade') {
            //   const ids = contactEmail[subField.name].map(trade => trade.id)
            //
            //   // subField.value = contactEmail[subField.name]
            //   subField.value = ids
            // }
          }
        })
      } else if (hasKey(contactEmail, field.name)) {
        field.value = contactEmail[field.name]
      }
    })
    pageTitle.value = `Update ${contactEmail.email}`
    breadcrumbs.value[2] = { title: `Update ${contactEmail.email}`, disabled: true }
  })
}

onBeforeMount(async () => {
  await initializeFields(initialFieldsContactEmails)

  const contactEmailId = route.params.id as string
  if (contactEmailId) {
    isUpdateMode.value = true
    await fetchContactEmailData(contactEmailId)
  }
  dataLoaded.value = true
})

useHead({
  title: computed(() => (isUpdateMode.value && contactEmailRef.value ? `Edit ${contactEmailRef.value.email}` : 'Create new contact email')),
})

const submitForm = async (values: Record<string, any>) => {
  const contactEmailData = { ...contactEmailRef.value, ...values } as ContactEmail
  const action = contactEmailData.id ? updateEmail : createEmail
  const { data } = await action(contactEmailData)

  watch(data, newVal => {
    router.push({ name: 'contactemails-details-id', params: { id: newVal?.id as string } })
  })
}
</script>

<template>
  <ItemUpdate
    v-if="dataLoaded"
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
    :fields="formFields as FormField[]"
    :submit-handler="submitForm"
    :is-update-mode="isUpdateMode"
  />
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import type ContactPhone from '@/types/contactphones/ContactPhone'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldsContactPhones } from '@/utils/initial_data/initialFieldsContactPhones'
import type FormField from '@/types/forms/FormField'
import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import { useContactPhones } from '@/composables/useContactPhones'

const { create: createPhone, getById: getPhoneById, update: updatePhone } = useContactPhones()
const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const isUpdateMode = ref(false)
const pageTitle = ref('Create Contact Phone')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Contact Phones', to: { name: 'contactphones' } },
  { title: 'New Contact Phone', disabled: true },
])

const { formFields, initializeFields } = useFormFields('contactphones')
const contactPhoneRef = ref<ContactPhone>()
const dataLoaded = ref(false)

const fetchContactPhoneData = async (id: string) => {
  const { data } = await getPhoneById(id)

  watch(data, (contactPhone: ContactPhone | null) => {
    if (contactPhone === null) {
      return
    }

    contactPhoneRef.value = contactPhone
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(contactPhone, subField.name)) {
            if (subField.type === 'checkbox') {
              subField.value = contactPhone[subField.name] ? 'true' : 'false'
            } else {
              subField.value = contactPhone[subField.name]
            }
          }
        })
      } else if (hasKey(contactPhone, field.name)) {
        field.value = contactPhone[field.name]
      }
    })
    pageTitle.value = `Update ${contactPhone.phone_number}`
    breadcrumbs.value[2] = { title: `Update ${contactPhone.phone_number}`, disabled: true }
  })
}

onBeforeMount(async () => {
  await initializeFields(initialFieldsContactPhones)

  const contactPhoneId = route.params.id as string
  if (contactPhoneId) {
    isUpdateMode.value = true
    await fetchContactPhoneData(contactPhoneId)
  }
  dataLoaded.value = true
})

useHead({
  title: computed(() => (isUpdateMode.value && contactPhoneRef.value ? `Edit ${contactPhoneRef.value.phone_number}` : 'Create new contact email')),
})

const submitForm = async (values: Record<string, any>) => {
  const contactPhoneData = { ...contactPhoneRef.value, ...values } as ContactPhone
  const action = contactPhoneData.id ? updatePhone : createPhone
  const { data } = await action(contactPhoneData)

  watch(data, newVal => {
    router.push({ name: 'contactphones-details-id', params: { id: newVal?.id as string } })
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

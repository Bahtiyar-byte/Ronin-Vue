<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import * as yup from 'yup'
import { useRoute } from 'vue-router'
import { useContacts } from '@/composables/useContacts'
import { hasKey } from '@core/utils/helpers'

import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import type Contact from '@/types/contacts/Contact'

const { getById: getContactById } = useContacts()
const route = useRoute()

const isUpdateMode = ref(false)
const pageTitle = ref('Create Contact')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Contacts', to: { name: 'contacts' } },
  { title: 'New contact', disabled: true },
])

const formFields = ref<Array<FormField | FormFieldsGroup>>([
  {
    title: 'General',
    fields: [
      {
        type: 'input',
        name: 'name',
        label: 'Name',
        value: '',
        rules: yup.string().required('Name is required'),
      },
      {
        type: 'input',
        name: 'email',
        label: 'Email',
        value: '',
        rules: yup.string().email('Invalid email').required('Email is required'),
      },
      {
        type: 'select',
        name: 'stage',
        label: 'Stage',
        value: '',
        variants: [
          { value: 'Lead', title: 'Lead' },
          { value: 'Prospect', title: 'Prospect' },
        ],
        rules: yup.string().required('Stage is required'),
      },
    ],
  },
])

const fetchContactData = async (id: string) => {
  const { data } = await getContactById(id)

  watch(data, (contact: Contact | null) => {
    if (contact === null) {
      return
    }

    formFields.value.forEach(field => {
      if ('fields' in field) {
        // Если поле является группой, обрабатываем вложенные поля
        field.fields.forEach(subField => {
          if (hasKey(contact, subField.name)) {
            subField.value = contact[subField.name] as string
          }
        })
      } else if (hasKey(contact, field.name)) {
        field.value = contact[field.name] as string
      }
    })

    pageTitle.value = `Update ${contact.name}`
    breadcrumbs.value[2] = { title: `Update ${contact.name}`, disabled: true }
  })
}

onBeforeMount(async () => {
  const contactId = route.params.id as string
  if (contactId) {
    isUpdateMode.value = true
    await fetchContactData(contactId)
  }
})

const submitForm = (values: Record<string, any>) => {
  console.log('Form submitted with values:', values)
}
</script>

<template>
  <ItemUpdate
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
    :fields="formFields"
    :submit-handler="submitForm"
  />
</template>

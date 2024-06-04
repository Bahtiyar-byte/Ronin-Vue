<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'
import * as yup from 'yup'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useContacts } from '@/composables/useContacts'
import { useFilters } from '@/composables/useFilters'
import { hasKey } from '@core/utils/helpers'

import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import type Contact from '@/types/contacts/Contact'

const { create: createContact, getById: getContactById, update: updateContact } = useContacts()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const isUpdateMode = ref(false)
const pageTitle = ref('Create Contact')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Contacts', to: { name: 'contacts' } },
  { title: 'New contact', disabled: true },
])

const { getVariants } = useFilters()
const contactRef = ref<Contact>()

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
        variants: [],
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

    contactRef.value = contact
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

const dataLoaded = ref<boolean>(false)

onBeforeMount(async () => {
  const processFormField = async (field: FormField) => {
    if (field.type === 'select') {
      const { data } = await getVariants('contacts', field.name)

      if (data.value === null) {
        return
      }

      field.variants = data.value
    }
  }

  const promises = (formFields.value as Array<FormField | FormFieldsGroup>).map(async (val: FormField | FormFieldsGroup) => {
    if ('fields' in val) {
      for (const field of val.fields) {
        await processFormField(field)
      }
    } else {
      await processFormField(val)
    }
  })

  await Promise.all(promises)

  const contactId = route.params.id as string
  if (contactId) {
    isUpdateMode.value = true
    await fetchContactData(contactId)
  }

  dataLoaded.value = true
})

useHead({
  title: computed(() => {
    return isUpdateMode.value && contactRef.value !== undefined ? `Edit ${contactRef.value.name}` : 'Create new job'
  }),
})

const submitForm = async (values: Record<string, any>) => {
  const _contactData = {
    ...contactRef.value,
    ...values,
  } as Contact

  const action = _contactData.id ? updateContact : createContact

  const { data } = await action(_contactData)

  watch(data, newVal => {
    console.log(newVal)
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
  />
</template>

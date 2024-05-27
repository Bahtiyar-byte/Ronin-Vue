<script lang="ts" setup>
import { ref } from 'vue'
import * as yup from 'yup'

import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import type FormField from '@/types/forms/FormField'

const pageTitle = ref('Update Contact')

const formFields = ref<FormField[]>([
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
])

const submitForm = (values: Record<string, any>) => {
  console.log('Form submitted with values:', values)
}
</script>

<template>
  <ItemUpdate
    :title="pageTitle"
    :breadcrumbs="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Contacts',
        to: { name: 'contacts' },
      },
      {
        title: 'New contact',
        disabled: true,
      },
    ]"
    :fields="formFields"
    :submit-handler="submitForm"
  />
</template>

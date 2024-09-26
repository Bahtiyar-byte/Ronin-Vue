// initialFieldsContacts.ts
import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'

export const initialFieldsContacts = (): (FormField | FormFieldsGroup)[] => {
  return [
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
          name: 'status',
          label: 'Status',
          value: '',
          variants: [],
          rules: yup.string().required('Status is required'),
        },
        {
          type: 'input',
          name: 'phone',
          label: 'Phone Number',
          value: '',
          rules: yup.string().required('Phone Number is required'),
        },
        {
          type: 'input',
          name: 'address',
          label: 'Address',
          value: '',
          rules: yup.string().required('Address is required'),
        },
        {
          type: 'select',
          name: 'source',
          label: 'Source',
          value: '',
          variants: [],
        },
      ],
    },
  ]
}

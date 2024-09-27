// initialFieldsTrades.ts
import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'

export const initialFieldsTrades: Array<FormField | FormFieldsGroup> = [
  {
    title: 'General',
    fields: [
      {
        type: 'input',
        name: 'Name',
        label: 'Name',
        value: '',
        rules: yup.string().required('Name is required'),
      },
    ],
  },
]

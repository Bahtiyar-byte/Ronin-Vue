// initialFieldsTemplates.ts
import * as yup from 'yup'

import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'

export const initialFieldsContactEmails: Array<FormField | FormFieldsGroup> = [
  {
    title: 'General',
    fields: [
      {
        type: 'input',
        name: 'email',
        label: 'Email',
        value: '',
        rules: yup.string().email('Invalid email format').required('Email is required'),
      },
      {
        type: 'autocomplete',
        name: 'type',
        label: 'Email type',
        value: '',
        multiple: false,
        eager: true,
        autocomplete_function: async (query: string = '') => {
          const data: string[] = [
            'personal', 'work', 'other',
          ]

          if (data.value === null) {
            return
          }

          return data.map(item => ({
            value: item,
            title: item.toUpperCase(),
          }))
        },
        rules: yup.string().required('Email type is required'),
      },
    ],
  },
]

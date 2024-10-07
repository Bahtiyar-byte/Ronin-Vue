// initialFieldsContactPhones.ts
import * as yup from 'yup'

import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'

export const initialFieldsContactPhones: Array<FormField | FormFieldsGroup> = [
  {
    title: 'General',
    fields: [
      {
        type: 'input',
        name: 'phone_number',
        label: 'Phone Number',
        value: '',
        rules: yup
          .string()
          .required('Phone Number is required')
          .matches(/^\d{11}$/, 'Phone Number must be exactly 11 digits'),
      },
      {
        type: 'autocomplete',
        name: 'type',
        label: 'Type',
        value: '',
        multiple: false,
        eager: true,
        autocomplete_function: async (query: string = '') => {
          const data: string[] = [
            'mobile', 'home', 'work',
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
      {
        type: 'checkbox',
        name: 'is_primary',
        label: 'Primary',
        value: 'false',
        modelValue: 'false',
      },
    ],
  },
]

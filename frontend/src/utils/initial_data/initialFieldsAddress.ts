// initialFieldsAddress.ts
import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'

export const initialFieldsAddress: Array<FormField | FormFieldsGroup> = [
  {
    title: 'General',
    fields: [
      {
        type: 'input',
        name: 'street',
        label: 'Street',
        value: '',
        rules: yup.string().required('Street is required'),
      },
      {
        type: 'input',
        name: 'suite_apt_unit',
        label: 'Suit/Apartment/Unit',
        value: '',
        rules: yup.string().required('Suit/Apartment/Unit is required'),
      },
      {
        type: 'input',
        name: 'city',
        label: 'City',
        value: '',
        rules: yup.string().required('City is required'),
      },
      {
        type: 'autocomplete',
        name: 'state',
        label: 'State',
        value: '',
        multiple: false,
        eager: true,
        autocomplete_function: async (query: string = '') => {
          const data  = [
            'AL', 'AK', 'AZ', 'AR', 'AS', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
            'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
            'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
            'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
            'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
          ];
          if (data.value === null) {
            return
          }

          return data.map(item => ({
            value: item,
            title: item,
          }))
        },

        rules: yup.string().required('State is required'),
      },
      {
        type: 'input',
        name: 'zip',
        label: 'Zip Code',
        value: '',
        rules: yup.string().required('Zip Code is required'),
      },
      {
        type: 'autocomplete',
        name: 'country',
        label: 'Country',
        value: '',
        multiple: false,
        eager: true,
        autocomplete_function: async (query: string = '') => {
          const data  = [
            'USA'
          ];
          if (data.value === null) {
            return
          }

          return data.map(item => ({
            value: item,
            title: item,
          }))
        },
        rules: yup.string().required('Country is required'),
      },
      {
        type: 'input',
        name: 'latitude',
        label: 'Latitude',
        value: '',
        rules: yup.string().required('Latitude Code is required'),
      },
      {
        type: 'input',
        name: 'longitude',
        label: 'Longitude',
        value: '',
        rules: yup.string().required('Longitude Code is required'),
      },
      {
        type: 'checkbox',
        name: 'is_mailing_address',
        label: 'Mailing Address',
        value: 'false',
        modelValue: 'false',
        // rules: yup.string().required('Mailing Address Code is required'),
      },
      {
        type: 'checkbox',
        name: 'is_location',
        label: 'Location Address',
        value: 'false',
        modelValue: 'false',
        // rules: yup.string().required('Mailing Address Code is required'),
      },
      {
        type: 'checkbox',
        name: 'is_billing_Address',
        label: 'Billng Address',
        value: 'false',
        modelValue: 'false',
        // rules: yup.string().required('Mailing Address Code is required'),
      },
    ],
  },
]

// initialFieldsJobs.ts
import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import { useContacts } from '@/composables/useContacts'

const { autocomplete: autocompleteContacts } = useContacts()

export const initialFieldsJobs: (FormField | FormFieldsGroup)[] = [
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
        type: 'textarea',
        name: 'description',
        label: 'Description',
        value: '',
      },
      {
        type: 'select',
        name: 'category',
        label: 'Category',
        value: '',
        variants: [],
        rules: yup.string().required('Category is required'),
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
        type: 'select',
        name: 'type',
        label: 'Type',
        value: '',
        variants: [],
        rules: yup.string(),
      },
      {
        type: 'autocomplete',
        name: 'related_contact',
        label: 'Related contact',
        value: '',
        autocomplete_function: async (query: string = '') => {
          const { data } = await autocompleteContacts(query)
          if (data.value === null)
          { return }

          return data.value.map(item => ({ value: item.id, title: item.label }))
        },
        rules: yup.string(),
      },
      {
        type: 'input',
        name: 'address',
        label: 'Address',
        value: '',
      },
      {
        type: 'input',
        name: 'start_date',
        label: 'Start Date',
        value: '',
      },
      {
        type: 'input',
        name: 'end_date',
        label: 'End Date',
        value: '',
      },
    ],
  },
]

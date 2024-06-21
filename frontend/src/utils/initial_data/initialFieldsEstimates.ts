import * as yup from 'yup'
import { useContacts } from '@/composables/useContacts'
import { useJobs } from '@/composables/useJobs'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import type FormField from '@/types/forms/FormField'

const { autocomplete: autocompleteContacts } = useContacts()
const { autocomplete: autocompleteJobs } = useJobs()

export const initialFieldEstimates: Array<FormField | FormFieldsGroup> = [
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
        rules: yup.string(),
      },
    ],
  },
  {
    title: 'Related',
    fields: [
      {
        type: 'autocomplete',
        name: 'related_job',
        label: 'Related job',
        value: '',
        autocomplete_function: async (query: string = '') => {
          const { data } = await autocompleteJobs(query)

          if (data.value === null) {
            return
          }

          return data.value.map(item => ({ value: item.id, title: item.label }))
        },
        rules: yup.string(),
      },
      {
        type: 'autocomplete',
        name: 'related_contact',
        label: 'Related contact',
        value: '',
        autocomplete_function: async (query: string = '') => {
          const { data } = await autocompleteContacts(query)

          if (data.value === null) {
            return
          }

          return data.value.map(item => ({ value: item.id, title: item.label }))
        },
        rules: yup.string(),
      },
    ],
  },
]

import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import { useContacts } from '@/composables/useContacts'

const { autocomplete: autocompleteContacts } = useContacts()
const { autocomplete: autocompleteJobs } = useJobs()
const { autocomplete: autocompleteUsers } = useUsers()

export const initialFieldAppointment: Array<FormField | FormFieldsGroup> = [
  {
    title: 'General',
    fields: [
      {
        type: 'input',
        name: 'subject',
        label: 'Subject',
        value: '',
        rules: yup.string().required('Subject is required'),
      },
      {
        type: 'textarea',
        name: 'notes',
        label: 'Notes',
        value: '',
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
      },
      {
        type: 'autocomplete',
        name: 'assigned_told',
        label: 'Assigned told',
        value: '',
        autocomplete_function: async (query: string = '') => {
          const { data } = await autocompleteUsers(query)

          if (data.value === null) {
            return
          }

          return data.value.map(item => ({ value: item.id, title: item.label }))
        },
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

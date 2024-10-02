// initialFieldsCrews.ts
import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import { useUsers } from '@/composables/useUsers'

const { autocomplete: autocompleteUsers } = useUsers()
export const initialFieldsCrews: Array<FormField | FormFieldsGroup> = [
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
        type: 'autocomplete',
        name: 'users',
        label: 'Users',
        value: [],
        eager: true,
        multiple: true,
        clearable: true,
        autocomplete_function: async (query: string = '') => {
          const { data } = await autocompleteUsers(query)
          if (data.value === null) {
            return
          }

          return data.value.map(item => ({
            value: item.id,
            title: item.label,
          }))
        },

        // rules: yup.array().required('Trade is required'),
      },
    ],
  },
]

// initialFieldsTemplates.ts
import * as yup from 'yup'
import { useTrades } from '@/composables/useTrades'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'

const { autocomplete: autocompleteTrades } = useTrades()
export const initialFieldsTemplates: Array<FormField | FormFieldsGroup> = [
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
        name: 'description',
        label: 'Description',
        value: '',
        rules: yup.string().required('Description is required'),
      },
      {
        type: 'autocomplete',
        name: 'related_trade',
        label: 'Trade',
        value: '',
        autocomplete_function: async (query: string = '') => {
          const { data } = await autocompleteTrades(query)
          if (data.value === null) {
            return
          }

          return data.value.map(item => ({
            value: item.id,
            title: item.label,
          }))
        },

        rules: yup.string().required('Trade is required'),
      },
    ],
  },
]

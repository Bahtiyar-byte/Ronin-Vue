// initialFieldsOrders.ts
import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import { useCrews } from '@/composables/useCrews'
import { useOrders } from '@/composables/useOrders'

const { autocomplete: autocompleteOrder } = useOrders()
const { autocomplete: autocompleteCrew } = useCrews()

export const initialFieldsLaborTicket = (): (FormField | FormFieldsGroup)[] => {
  return [
    {
      title: 'Create New Labor Ticket',
      fields: [
        {
          type: 'autocomplete',
          name: 'related_order',
          label: 'Related Order',
          value: '',
          autocomplete_function: async (query: string = '') => {
            const { data } = await autocompleteOrder(query)
            if (data.value === null)
            { return }

            return data.value.map(item => ({ value: item.id, title: item.label }))
          },
          rules: yup.string().required('Related Order is Required'),
        },
        {
          type: 'autocomplete',
          name: 'assigned_crew',
          label: 'Assigned Crew',
          value: '',
          autocomplete_function: async (query: string = '') => {
            const { data } = await autocompleteCrew(query)
            if (data.value === null)
            { return }

            return data.value.map(item => ({ value: item.id, title: item.label }))
          },
          rules: yup.string().required('Assigned Crew is Required'),
        },
        {
          type: 'textarea',
          name: 'crew_instructions',
          label: 'Crew Instructions',
          value: '',
          rules: yup.string(),
        },
      ],
    },
  ]
}

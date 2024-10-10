// initialFieldsOrders.ts
import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import { useTrades } from '@/composables/useTrades'
import { useEstimates } from '@/composables/useEstimates'

const { autocomplete: autocompleteTrades } = useTrades()
const { autocomplete: autocompleteEstimates } = useEstimates()

export const initialFieldsOrders = (): (FormField | FormFieldsGroup)[] => {
  return [
    {
      title: 'Create New Order',
      fields: [
        {
          type: 'autocomplete',
          name: 'related_trade',
          label: 'Trade Type',
          value: '',
          autocomplete_function: async (query: string = '') => {
            const { data } = await autocompleteTrades(query)
            if (data.value === null)
            { return }

            return data.value.map(item => ({ value: item.label, title: item.label }))
          },
          rules: yup.string().required('Trade Type is Required'),
        },
        {
          type: 'autocomplete',
          name: 'related_estimate',
          label: 'Related Estimates',
          value: '',
          autocomplete_function: async (query: string = '') => {
            const { data } = await autocompleteEstimates(query)
            if (data.value === null)
            { return }

            return data.value.map(item => ({ value: item.id, title: item.label }))
          },
          rules: yup.string().required('Related Estimate is Required'),
        },
        {
          type: 'textarea',
          name: 'notes',
          label: 'Notes',
          value: '',
          rules: yup.string().required('Notes is Required'),
        },
        {
          type: 'textarea',
          name: 'crew_instructions',
          label: 'Crew Instructions',
          value: '',
          rules: yup.string().required('Crew Instructions is Required'),
        },
        {
          type: 'input',
          name: 'total_amount',
          label: 'Total Amount',
          value: '',
          rules: yup.string(),
        },
      ],
    },
  ]
}

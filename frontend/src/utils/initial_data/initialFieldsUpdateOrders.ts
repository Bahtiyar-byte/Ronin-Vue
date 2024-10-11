// initialFieldsOrders.ts
import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import { useTrades } from '@/composables/useTrades'
import { useEstimates } from '@/composables/useEstimates'

const { autocomplete: autocompleteTrades } = useTrades()
const { autocomplete: autocompleteEstimates } = useEstimates()

export const initialFieldsUpdateOrders = (): (FormField | FormFieldsGroup)[] => {
  return [
    {
      title: 'Update Order',
      fields: [
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

// composables/useFormFields.ts
import { ref } from 'vue'
import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import { useFilters } from '@/composables/useFilters'

export const useFormFields = (formType: 'jobs' | 'contacts') => {
  const { getVariants } = useFilters()
  const formFields = ref<Array<FormField | FormFieldsGroup>>([])

  const initializeFields = async (fields: Array<FormField | FormFieldsGroup>) => {
    const processFormField = async (field: FormField) => {
      if (field.type === 'select') {
        const { data } = await getVariants(formType, field.name)
        if (data.value !== null) {
          field.variants = data.value
        }
      }
    }

    const promises = fields.map(async (val) => {
      if ('fields' in val) {
        for (const field of val.fields) {
          await processFormField(field)
        }
      } else {
        await processFormField(val)
      }
    })

    await Promise.all(promises)
    formFields.value = fields
  }

  return { formFields, initializeFields }
}

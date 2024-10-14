import type * as yup from 'yup'

export default interface FormField {
  type: 'input' | 'textarea' | 'select' | 'autocomplete' | 'checkbox' | 'button' | 'datetime'
  value?: any
  multiple?: boolean
  eager?: boolean
  clearable?: boolean
  selectedCheckbox?: string[]
  checkboxContent?: string[]
  modelValue?: any | string
  variants?: Array<{ value: any; title: string } | string>
  autocomplete_function?: (query: string) => Promise<Array<{ value: any; title: string } | string> | void> // Void if error happened
  name: string
  label: string
  rules?: yup.Schema // правила валидации Vee-validate
}

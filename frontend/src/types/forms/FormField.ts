import type * as yup from 'yup'

export default interface FormField {
  type: 'input' | 'select' | 'autocomplete'
  value?: any
  variants?: Array<{ value: any; title: string } | string>
  autocomplete_function?: () => Promise<Array<{ value: any; title: string } | string> | void> // Void if error happened
  name: string
  label: string
  rules?: yup.Schema // правила валидации Vee-validate
}

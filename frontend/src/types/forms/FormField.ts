import type * as yup from 'yup'

export default interface FormField {
  type: 'input' | 'select'
  value?: any
  variants?: { value: any; title: string }[]
  name: string
  label: string
  rules?: yup.Schema // правила валидации Vee-validate
}

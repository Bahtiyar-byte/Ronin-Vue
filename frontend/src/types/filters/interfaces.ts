export interface FilterItem {
  type: 'text' | 'checkbox'
  key: string
  label: string
  value?: string | string[]
}

export interface CheckboxFilterItem extends FilterItem {
  type: 'checkbox'
  multiple?: boolean
  options: string[] | Array<{
    label: string
    value: string
    disabled?: boolean
  }>
}

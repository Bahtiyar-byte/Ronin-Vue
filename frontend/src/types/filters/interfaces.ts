export interface FilterItem {
  type: 'text' | 'checkbox'
  key: string
  label: string
}

export interface TextFilterItem extends FilterItem {
  type: 'text'
}

export interface CheckboxFilterItem extends FilterItem {
  type: 'checkbox'
  options: Array<{
    label: string
    value: string
    disabled?: boolean
  }>
}

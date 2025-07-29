export interface SelectProps {
  name: string
  modelValue?: string | number
  disabled?: boolean
  filter?: boolean
  options?: Option[]
  required?: boolean
}

export type SelectContext = {
  addOption: (option: Option) => void
}

export type SelectEmits = {
  ['update:modelValue']: (value: string) => string
}

export interface SelectOptionProps {
  name: string
  value: string
}

export type Option = {
  name: string
  value: string
  info?: string
  filter?: boolean
}

export interface CheckboxProps {
  name?: string
  modelValue?: string[]
  value: string
  disabled?: boolean
  readonly?: boolean
  label?: string
  labelFor?: string
  skin?: 'normal' | 'tag' | 'customize'
}

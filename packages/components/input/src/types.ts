export interface InputProps {
  type: 'text' | 'password'
  name: string
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  formatter?: (value: string | number | undefined) => string
  width?: number
  max?: number
  maxlength?: number
  min?: number
  minlength?: number
  pattern?: RegExp | string
  readonly?: boolean
  required?: 'required'
  step?: number
  autocomplete?: 'on' | 'off'
  clearable?: boolean
  valid?: (value: string | undefined) => boolean
}

export const inputEmits = {
  ['update:modelValue']: (value: string) => value
}

export type InputEmits = typeof inputEmits

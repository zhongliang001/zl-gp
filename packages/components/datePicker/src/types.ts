export type Date = {
  year: number
  month: number
  day: number
  dStr: string
}

export interface DatePickerProps {
  editable?: boolean
  format?: string
  disabled?: boolean
  modelValue?: string
  name?: string
  showTime?: boolean
  weekStart?: 'monday' | 'sunday'
  clearable?: boolean
}

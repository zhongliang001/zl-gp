import type { Ref } from 'vue'

export type DatePickerInstance = {
  getYear: () => Ref<number>
  getMonth: () => Ref<number>
}

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
}

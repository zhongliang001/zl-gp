export interface FileInputProps {
  name: string
  modelValue?: string
  accept?: string
  multiple?: boolean
  type?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'secondary'
}

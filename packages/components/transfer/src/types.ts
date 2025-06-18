export interface TransferProps {
  options: TransferOption[]
  modelValue: string[]
  ltitle?: string
  rtitle?: string
  filter?: boolean
}

export type TransferOption = {
  name: string
  value: string
  disabled?: boolean
}

export interface TransferBoxProps {
  options: TransferOption[]
  title?: string
  filter?: boolean
  selValue: string[]
  direction: 'left' | 'right'
}

export interface ButtonProps {
  name?: string
  disabled?: boolean
  nativeType?: 'button' | 'submit' | 'reset' | undefined
  type?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'secondary'
  width?: number
  fontSize?: number
}

export const buttonEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent
}

export type ButtonEmits = typeof buttonEmits

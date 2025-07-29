export interface ButtonProps {
  name?: string
  disabled?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  type?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'secondary'
  circle?: boolean
  size?: 'large' | 'small' | 'normal' | 'mini'
}

export const buttonEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent
}

export type ButtonEmits = typeof buttonEmits

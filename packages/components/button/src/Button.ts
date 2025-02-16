import { ref, type SetupContext } from 'vue'

export interface ButtonProps {
  name: string
  disabled: boolean
  nativeType: 'button' | 'submit' | 'reset' | undefined
  type: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'secondary'
  width: number
  height: number
}

export const buttonEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent
}

export type ButtonEmits = typeof buttonEmits

export function useButton(emit: SetupContext<ButtonEmits>['emit'], props: ButtonProps) {
  const _ref = ref<HTMLButtonElement>()
  const disabled = props.disabled
  const _props = {
    style: {
      width: props.width + 'rem',
      height: props.height + 'rem'
    },
    type: props.nativeType,
    disabled: props.disabled
  }

  const eventHandler = (event: MouseEvent) => {
    if (disabled) {
      event.stopPropagation()
      return
    }
    emit('click', event)
  }
  return {
    _ref,
    eventHandler,
    _props
  }
}

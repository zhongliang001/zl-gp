import { FormInjectkey } from '../../form'
import { inject, ref, type SetupContext } from 'vue'
import type { ButtonEmits, ButtonProps } from './types'

export function useButton(emit: SetupContext<ButtonEmits>['emit'], props: ButtonProps) {
  const _ref = ref<HTMLButtonElement>()
  const disabled = props.disabled
  const formInjectkey = inject(FormInjectkey, undefined)
  const _props = {
    style: {
      width: props.width + 'rem',
      fontSize: props.fontSize + 'rem'
    },
    type: props.nativeType,
    disabled: props.disabled
  }

  const eventHandler = (event: MouseEvent) => {
    if (disabled) {
      event.stopPropagation()
      return
    }

    if (props.nativeType === 'reset') {
      if (formInjectkey && formInjectkey.reset) {
        formInjectkey.reset()
      }
    }
    if (props.nativeType === 'submit') {
      if (formInjectkey && formInjectkey.ref) {
        const re: HTMLFormElement = formInjectkey.ref
        let result = true
        if (formInjectkey.validate) {
          result = formInjectkey.validate()
        }
        if (result) {
          re.submit()
        } else {
          event.preventDefault()
        }
      }
    }
    emit('click', event)
  }
  return {
    _ref,
    eventHandler,
    _props
  }
}

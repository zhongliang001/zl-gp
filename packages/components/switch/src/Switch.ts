import { watch, type Ref } from 'vue'
import type { SwitchProps } from './types'

const useSwitch = (
  props: SwitchProps,
  isRight: Ref<boolean | undefined>,
  emit: (event: 'update:modelValue', ...args: unknown[]) => void,
  input: Ref<HTMLInputElement | undefined, HTMLInputElement | undefined>
) => {
  watch(
    () => props.modelValue,
    (newVal) => {
      isRight.value = newVal
      if (input.value && typeof newVal !== 'undefined') {
        input.value.checked = newVal
      }
    }
  )

  const click = () => {
    emit('update:modelValue', !isRight.value)
  }

  return {
    click
  }
}

export default useSwitch

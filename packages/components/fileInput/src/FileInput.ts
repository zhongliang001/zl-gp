import type { InputEmits } from '@zl-gp/components'
import type { Ref, SetupContext } from 'vue'

export interface FileInputProps {
  name: string
  modelValue?: string
}

export const useFileInput = (
  _ref: Ref<HTMLInputElement | null>,
  msg: Ref<string>,
  emit: SetupContext<InputEmits>['emit']
) => {
  const inputHandler = (event: Event) => {
    const input: HTMLInputElement | null = _ref.value
    const { value } = event.target as HTMLInputElement
    if (input) {
      msg.value = value
    }

    emit('update:modelValue', value)
  }

  const reset = (value: string | undefined) => {
    if (value) {
      emit('update:modelValue', value)
    } else {
      emit('update:modelValue', '')
    }
  }

  return {
    inputHandler,
    reset
  }
}

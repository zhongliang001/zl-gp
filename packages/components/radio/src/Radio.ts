import { ref, watch, type Ref } from 'vue'
import type { RadioProps } from './types'

export const useRadio = (
  props: RadioProps,
  inputRef: Ref<HTMLInputElement | undefined>,
  emit: (event: 'update:modelValue', ...args: unknown[]) => void
) => {
  const checked = ref(false)

  const defaultColor = 'hsl(222, 17%, 88%)'
  const selectedColor = 'hsl(354, 70%, 54%)'
  const color = ref('')

  const click = () => {
    if (inputRef.value) {
      const input = inputRef.value
      if (input.value) {
        emit('update:modelValue', input.value)
      }
    }
  }

  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal === props.value) {
        checked.value = true
        color.value = selectedColor
      } else {
        checked.value = false
        color.value = defaultColor
      }
    }
  )

  return {
    checked,
    click,
    color
  }
}

import { remove } from 'lodash-es'
import { nextTick, onMounted, ref, type Ref, watch } from 'vue'
import type { CheckboxProps } from './types'

export const useCheckbox = (
  inputRef: Ref<HTMLInputElement | undefined>,
  props: CheckboxProps,
  emit: (event: 'update:modelValue' | 'change', ...args: unknown[]) => void
) => {
  const defaultColor = 'hsl(222, 17%, 88%)'
  const selectedColor = 'hsl(156, 79%, 40%)'

  const checkState = ref('checkbox_unchecked')
  const color = ref(defaultColor)
  const selected = ref(false)

  const syncState = async () => {
    const checked = props.modelValue?.includes(props.value)
    selected.value = !!checked
    checkState.value = checked ? 'checkbox_checked' : 'checkbox_unchecked'
    color.value = props.skin === 'tag' ? (checked ? selectedColor : defaultColor) : defaultColor
    if (inputRef.value) {
      inputRef.value.checked = !!checked
    }
    await nextTick()
    emit('change')
  }

  onMounted(syncState)
  watch(
    () => props.modelValue,
    () => {
      syncState()
    },
    { immediate: true, deep: true }
  )

  const click = (event: Event) => {
    event.stopPropagation()
    if (props.disabled || props.readonly) return
    if (selected.value) {
      unselect()
    } else {
      select()
    }
  }

  const select = async () => {
    if (props.disabled || props.readonly) return
    if (!selected.value) {
      emit('update:modelValue', [...(props.modelValue ?? []), props.value])
    }
  }

  const unselect = () => {
    if (props.disabled || props.readonly) return
    if (selected.value) {
      const tmp = [...(props.modelValue ?? [])]
      remove(tmp, (child) => child === props.value)
      emit('update:modelValue', tmp)
    }
  }

  const indeterminate = async () => {
    checkState.value = 'checkbox-indeterminate-line'
  }

  const changecheckState = (state: string) => {
    checkState.value = state
  }

  return {
    changecheckState,
    checkState,
    click,
    color,
    indeterminate,
    select,
    selected,
    unselect
  }
}

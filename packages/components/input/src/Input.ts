import { computed, ref, type Ref, type SetupContext } from 'vue'
import type { InputEmits, InputProps } from './types'

export const useInput = (
  props: InputProps,
  emit: SetupContext<InputEmits>['emit'],
  _ref: Ref<HTMLInputElement | null>,
  setMessage: ((msg: string) => void) | undefined
) => {
  const formatter = props.formatter
  const _props = computed(() => {
    const normalType = ['text', 'password']
    const style =
      normalType.indexOf(props.type) > -1
        ? {
            width: `calc(${props.width + '%'}  - 14px)`,
            height: props.height + 'px'
          }
        : {}
    return {
      name: props.name,
      placeholder: props.placeholder,
      disabled: props.disabled,
      readonly: props.readonly,
      maxlength: props.maxlength,
      type: props.type,
      max: props.max,
      min: props.min,
      minlength: props.minlength,
      step: props.step,
      style
    }
  })
  const autocomplete = ref('off')
  if (props.autocomplete) {
    autocomplete.value = props.autocomplete
  } else {
    if (props.type === 'password') {
      autocomplete.value = 'on'
    }
  }

  const error = ref(false)

  const handlerInput = (event: Event) => {
    const { value } = event.target as HTMLInputElement
    emit('update:modelValue', value)
  }

  const handlerBlur = () => {
    const input: HTMLInputElement | null = _ref.value
    const value = input?.value
    if (formatter && input) {
      input.value = formatter(value)
    }
    if (props.pattern && value && !new RegExp(props.pattern).test(value) && input) {
      input.value = ''
      if (setMessage) {
        setMessage('输入数据格式不对')
        error.value = true
      }
      emit('update:modelValue', '')
    } else {
      if (setMessage) {
        setMessage('')
        error.value = false
      }
    }
  }

  const handlerFocus = () => {
    const input: HTMLInputElement | null = _ref.value
    if (props.modelValue && input) {
      if (typeof props.modelValue === 'string') {
        input.value = props.modelValue
      } else {
        input.value = props.modelValue.toString()
      }
    }

    if (setMessage) {
      setMessage('')
      error.value = false
    }
  }

  const reset = (value: string | undefined) => {
    const input: HTMLInputElement | null = _ref.value
    const formatter = props.formatter
    if (input) {
      if (formatter) {
        input.value = formatter(value)
      } else {
        input.value = value && typeof value !== 'object' ? value : ''
      }
    }
    if (value && typeof value !== 'object') {
      emit('update:modelValue', value)
    } else {
      emit('update:modelValue', '')
    }
  }

  const click = () => {
    // event.stopPropagation()
  }

  return {
    _ref,
    _props,
    autocomplete,
    handlerBlur,
    click,
    error,
    handlerFocus,
    handlerInput,
    reset
  }
}

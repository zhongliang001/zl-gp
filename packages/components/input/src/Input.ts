import { computed, ref, type Ref, type SetupContext } from 'vue'
export interface InputProps {
  type: 'text' | 'password' | 'radio' | 'checkbox'
  name: string
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  formatter?: (value: string | number | undefined) => string
  width?: number
  height?: number
  max?: number
  maxlength?: number
  min?: number
  minlength?: number
  pattern?: RegExp
  readonly?: boolean
  required?: 'required'
  step?: number
}

export const inputEmits = {
  ['update:modelValue']: (value: string) => value
}

export type InputEmits = typeof inputEmits

export const useInput = (
  props: InputProps,
  emit: SetupContext<InputEmits>['emit'],
  _ref: Ref<HTMLInputElement | null>,
  setMessage: ((msg: string) => void) | undefined
) => {
  const formatter = props.formatter
  const _props = computed(() => {
    const style = {
      width: props.width + '%',
      height: props.height + 'px'
    }
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

  const error = ref(false)

  const handlerInput = (event: Event) => {
    const input: HTMLInputElement | null = _ref.value
    const { value } = event.target as HTMLInputElement
    if (input) {
      input.value = value
    }

    emit('update:modelValue', value)
  }

  const blur = () => {
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

  const focus = () => {
    const input: HTMLInputElement | null = _ref.value
    if (props.modelValue && input) {
      input.value = props.modelValue
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
        input.value = value ? value : ''
      }
    }
    if (value) {
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
    blur,
    error,
    focus,
    handlerInput,
    reset,
    click
  }
}

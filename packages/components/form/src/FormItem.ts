import { onMounted, ref, type InjectionKey, type Ref } from 'vue'
import type { Field, FormContext } from './Form.ts'
import { createPopper } from '@popperjs/core/lib/popper-lite'

export const FormItemInjectKey: InjectionKey<FormItemContext> = Symbol('FormItemContext')
export interface FormItemProps {
  prop: string
  label: string
}

export type FormItem = {
  prop: string
  valid: (msg: string) => void
  field?: Field
}

export type FormItemContext = {
  addFiled: (filed: Field) => void
  setMessage: (msg: string) => void
}

export const useFormItem = (
  prop: string,
  formInjectkey: FormContext | undefined,
  input: Ref<HTMLDivElement | undefined>,
  error: Ref<HTMLDivElement | undefined>
) => {
  const field = ref<Field>()
  const addFiled = (f: Field) => {
    field.value = f
  }
  const message = ref()

  const valid = (msg: string) => {
    message.value = msg
  }
  const addItem = formInjectkey?.addItem
  onMounted(() => {
    if (input.value && error.value) {
      createPopper(input.value, error.value, {
        placement: 'bottom-start'
      })
    }
    if (addItem) {
      addItem({
        prop: prop,
        valid: valid,
        field: field.value
      })
    }
  })

  const setMessage = (msg: string) => {
    message.value = msg
  }
  return {
    field,
    addFiled,
    message,
    setMessage
  }
}

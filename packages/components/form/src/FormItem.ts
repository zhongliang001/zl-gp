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
  valid?: (msg?: string) => boolean
  field?: Field
  setMessage: (msg: string) => void
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
        valid: field?.value?.valid,
        field: field.value,
        setMessage
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

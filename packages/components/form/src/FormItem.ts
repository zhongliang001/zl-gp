import { onMounted, ref, type InjectionKey } from 'vue'
import type { Field, FormContext } from './Form.ts'

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

export const useFormItem = (prop: string, formInjectkey: FormContext | undefined) => {
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

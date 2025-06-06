import { onMounted, ref, type InjectionKey, type Ref } from 'vue'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import type { Field, FormContext, FormItemContext } from './types.ts'

export const FormItemInjectKey: InjectionKey<FormItemContext> = Symbol('FormItemContext')

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

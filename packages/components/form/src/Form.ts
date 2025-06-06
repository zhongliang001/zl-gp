import { ref, type InjectionKey, type Ref } from 'vue'
import { clone, find } from 'lodash-es'
import type { FormContext, FormItem, FormProps, FormRule } from './types'

export const FormInjectkey: InjectionKey<FormContext> = Symbol('FormInjectkey')

export const formEmits = {
  ['update:modelValue']: (value: string) => value
}

export type FormEmits = typeof formEmits

export const useForm = (props: FormProps) => {
  const formItems: Ref<FormItem[]> = ref<FormItem[]>([])

  const addItem = (formItem: FormItem) => {
    formItems.value.push(formItem)
  }
  const _ref = ref<HTMLFormElement | null>(null)
  const rules = props.rules
  const data = props.modelValue

  const initData = clone(props.modelValue)
  const validate = (): boolean => {
    let result = true
    formItems.value.forEach((item) => {
      const name = item.prop
      if (item.valid) {
        const da = data ? data[name] : undefined
        result = item.valid(da)
        if (!result) {
          item.setMessage('校验失败')
          result = false
        } else {
          item.setMessage('')
          result = true
        }
      }
      const formRule = find(rules, (rule: FormRule) => {
        return rule.name == name
      })
      if (formRule) {
        formRule.rules.forEach((ru) => {
          const da = data ? data[name] : undefined
          if (ru.reg) {
            if (da && !ru.reg.test(da)) {
              item.setMessage(ru.message)
              result = false
            }
          }
        })
      }
    })
    return result
  }

  const reset = () => {
    formItems.value.forEach((t) => {
      if (t.field && t.field.reset) {
        const p: string = t.prop
        if (p && initData) {
          t.field.reset(initData[p])
        }
      }
    })
  }

  return {
    formItems,
    addItem,
    reset,
    _ref,
    validate
  }
}

import { ref, type InjectionKey, type Ref } from 'vue'
import type { FormItem } from './FormItem'
import { clone, find } from 'lodash-es'

export type Field = {
  reset: (value: string | undefined) => void
  valid?: (msg?: string | undefined) => boolean
}

export interface FormProps {
  name?: string
  url?: string
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
  method?: 'POST' | 'GET' | 'post' | 'get'
  novalidate?: boolean
  target?: '_blank' | '_self' | '_parent' | '_top'
  modelValue?: { [key: string]: string }
  rules?: FormRule[]
}

export interface FormInstance {
  reset: () => void
  value: unknown
  ref: HTMLFormElement | null
  validate: () => void
}

export const FormInjectkey: InjectionKey<FormContext> = Symbol('FormInjectkey')

export type FormContext = {
  addItem: (formItem: FormItem) => void
  ref: HTMLFormElement | null
  reset: () => void
  validate: () => boolean
}

export type FormRule = {
  name: string
  rules: Rule[]
}

export type Rule = {
  reg: RegExp
  validator: (value: unknown) => boolean
  message: string
}

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
        result = item.valid()
        if (!result) {
          item.setMessage('校验失败')
          result = false
          return
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

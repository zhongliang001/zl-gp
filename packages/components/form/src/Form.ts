import { ref, type InjectionKey, type Ref } from 'vue'
import type { FormItem } from './FormItem'
import { clone } from 'lodash-es'

export type Field = {
  reset: (value: string | undefined) => void
}

export interface FormProps {
  name: string
  url: string
  enctype: 'application/x-www-form-urlencoded' | 'multipart/form - data' | 'text/plain'
  method: 'POST' | 'GET' | 'post' | 'get'
  novalidate: boolean
  target: '_blank' | '_self' | '_parent' | '_top'
  modelValue?: { [key: string]: string }
  rules: FormRule[]
}

export interface Form {
  reset: () => void
  value: unknown
  ref: HTMLFormElement | null
}

export const FormInjectkey: InjectionKey<FormContext> = Symbol('FormInjectkey')

export type FormContext = {
  addItem: (formItem: FormItem) => void
}

export type FormRule = {
  name: string
  rule: Rule[]
}

export type Rule = {
  reg: RegExp
  volidator: (value: unknown) => boolean
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
  const volidate = () => {
    if (rules) {
      rules.forEach((t: FormRule) => {
        const name = t.name
        const items = formItems.value.filter((f) => {
          if (f.prop == name) {
            return f
          }
        })
        if (items) {
          const item = items[0]
          const da = data ? data[name] : undefined
          if (!da) {
            return
          }
          const rule: Rule[] = t.rule
          rule.forEach((ru) => {
            if (ru.reg) {
              if (!ru.reg.test(da)) {
                item.valid(ru.message)
              }
            }
            if (ru.volidator) {
              if (!ru.volidator(da)) {
                item.valid(ru.message)
              }
            }
          })
        }
      })
    }
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
    volidate
  }
}

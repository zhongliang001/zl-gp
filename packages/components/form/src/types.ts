export type Field = {
  reset: (value: string | undefined) => void
  valid?: (msg?: string | undefined) => boolean
  setValidResult: (result: boolean) => void
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
  validator?: (value: unknown) => boolean
  message: string
}

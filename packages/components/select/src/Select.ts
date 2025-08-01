import { getCurrentInstance, ref, type InjectionKey, type Ref, type SetupContext } from 'vue'
import type { Option, SelectContext, SelectEmits, SelectProps } from './types'

export const SelectInjectKey: InjectionKey<SelectContext> = Symbol('SelectInjectKey')

export const useSelect = (
  props: SelectProps,
  emit: SetupContext<SelectEmits>['emit'],
  _ref: Ref<HTMLDivElement | null>,
  selInput: Ref<HTMLInputElement | null>,
  setMessage: ((msg: string) => void) | undefined
) => {
  const hidden = ref(true)
  const internalInstance = getCurrentInstance()
  const _props = {
    // readonly: !props.filter,
    disabled: props.disabled
  }

  const iconName = ref('arrow-right')
  const error = ref(false)

  const validFlag = ref(false)
  const addOption = (option: Option) => {
    if (props.options) {
      props.options?.push(option)
    } else {
      props.options = [option]
    }
  }

  const sel = (val: Option) => {
    const input: HTMLInputElement | null = selInput.value
    if (input) {
      input.value = val.name
    }
    emit('update:modelValue', val.value)
    iconName.value = 'arrow-right'
    hidden.value = true
    if (props.filter) {
      filterWord()
    }
  }

  /**
   * 点击input时展示下拉选
   */
  const handlerClick = () => {
    hidden.value = false
    iconName.value = 'arrow-down'
  }

  /**
   * 光标移出是隐藏下拉选
   */
  const handlerMouseleave = () => {
    hidden.value = true
    iconName.value = 'arrow-right'
  }

  const handlerEnd = (target: EventTarget | null) => {
    if (!props.filter) {
      return
    }
    const t = target as HTMLInputElement | null
    const v = t?.value
    filterWord(v)
  }

  /**
   * 通过输入的内容筛选下拉选
   * @param word 输入的字符
   */
  const filterWord = async (word?: string) => {
    await props.options?.forEach((option: Option) => {
      const name = option.name
      if (word) {
        if (name.indexOf(word) !== -1) {
          option.filter = false
          option.info = option.name.replace(
            new RegExp(word, 'g'),
            "<span class='filter'>" + word + '</span>'
          )
        } else {
          option.filter = true
        }
      } else {
        option.filter = false
        option.info = option.name
      }
    })
    // 强制更新页面
    internalInstance?.update()
  }

  const init = () => {
    update(props.modelValue)
  }

  const update = (val: string | number | undefined) => {
    const input: HTMLInputElement | null = selInput.value
    props.options?.forEach((option: Option) => {
      if (option.value === val) {
        if (input) {
          input.value = option.name
        }
      }
    })
  }

  const reset = (value: string | undefined) => {
    const names = props.options?.filter((t) => {
      return t.value === value
    })
    if (!names || names.length === 0) {
      return
    }
    const input: HTMLInputElement | null = selInput.value
    if (input) {
      input.value = names[0].name
    }
    emit('update:modelValue', names[0].value)
  }
  const valid = () => {
    validFlag.value = true
    if (props.required && !props.modelValue && setMessage) {
      setMessage('请选择一条数据')
      setValidResult(false)
      return false
    }
    return true
  }

  const setValidResult = (result: boolean) => {
    validFlag.value = true
    error.value = !result
  }
  return {
    _props,
    addOption,
    handlerClick,
    handlerEnd,
    handlerMouseleave,
    hidden,
    init,
    iconName,
    sel,
    update,
    reset,
    setValidResult,
    validFlag,
    error,
    valid
  }
}

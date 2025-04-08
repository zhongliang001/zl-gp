import { ref, type InjectionKey, type Ref, type SetupContext } from 'vue'
import type { Option } from './SelectOption'

export const SelectInjectKey: InjectionKey<SelectContext> = Symbol('SelectInjectKey')

export interface SelectProps {
  name: string
  modelValue?: string
  disabled?: boolean
  filter?: boolean
}

export type SelectContext = {
  addOption: (option: Option) => void
}

export type SelectEmits = {
  ['update:modelValue']: (value: string) => string
}

export const useSelect = (
  props: SelectProps,
  emit: SetupContext<SelectEmits>['emit'],
  _ref: Ref<HTMLDivElement | null>,
  selInput: Ref<HTMLInputElement | null>
) => {
  const hidden = ref(true)
  const options = ref<Option[]>([])
  const _props = {
    // readonly: !props.filter,
    disabled: props.disabled
  }

  const iconName = ref('arrow-right')

  const addOption = (option: Option) => {
    options.value.push(option)
  }

  const sel = (val: Option) => {
    const input: HTMLInputElement | null = selInput.value
    if (input) {
      input.value = val.name
    }
    emit('update:modelValue', val.value)
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

  const handlerInput = (event: Event, isComposing: boolean) => {
    const target = event.target
    iconName.value = 'arrow-down'
    if (!isComposing) {
      handlerEnd(target)
    }
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
  const filterWord = (word?: string) => {
    options.value.forEach((option: Option) => {
      const name = option.name
      if (word) {
        if (name.indexOf(word) !== -1) {
          option.filter = false
          option.info = option.name.replaceAll(word, "<p class='filter'>" + word + '</p>')
        } else {
          option.filter = true
        }
      } else {
        option.filter = false
        option.info = option.name
      }
    })
  }

  const init = () => {
    update(props.modelValue)
  }

  const update = (val: string | undefined) => {
    const input: HTMLInputElement | null = selInput.value
    options.value.forEach((option: Option) => {
      if (option.value === val) {
        if (input) {
          input.value = option.name
        }
      }
    })
  }

  return {
    _props,
    addOption,
    handlerClick,
    handlerEnd,
    handlerInput,
    handlerMouseleave,
    hidden,
    init,
    iconName,
    options,
    sel,
    update
  }
}

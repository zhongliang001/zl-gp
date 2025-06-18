import { remove } from 'lodash-es'
import type { TransferOption } from './types'
import { computed, reactive, watch, type Ref } from 'vue'
import type { TransferBoxInstance } from './instances'

export const useTransfer = (
  options: TransferOption[],
  leftBox: Ref<TransferBoxInstance | undefined>,
  rightBox: Ref<TransferBoxInstance | undefined>,
  emit: (event: 'update:modelValue', ...args: unknown[]) => void
) => {
  const selValue: string[] = reactive([])

  const leftIdx = computed(() => {
    return leftBox.value?.selIdx
  })

  const rightIdx = computed(() => {
    return rightBox.value?.selIdx
  })

  watch(
    leftIdx,
    (newVal) => {
      if (newVal !== -1) {
        rightBox.value?.reset()
      }
    },
    { deep: true }
  )

  watch(rightIdx, (newVal) => {
    if (newVal !== -1) {
      leftBox.value?.reset()
    }
  })

  const select = () => {
    const selIdx = leftBox.value?.selIdx
    if (selIdx !== undefined && selIdx !== -1 && selValue.indexOf(options[selIdx].value) === -1) {
      selValue.push(options[selIdx].value)
      emit('update:modelValue', selValue)
    }
    if (leftBox.value) {
      leftBox.value.selIdx = -1
    }
  }

  const selectAll = () => {
    selValue.length = 0
    options.forEach((option) => {
      if (!option.disabled) {
        selValue.push(option.value)
      }
    })
    emit('update:modelValue', selValue)
  }

  const unSelect = () => {
    const selIdx = rightBox.value?.selIdx
    if (selIdx !== undefined && selIdx !== -1) {
      remove(selValue, (item) => item === options[selIdx].value)
      emit('update:modelValue', selValue)
    }
    if (rightBox.value) {
      rightBox.value.selIdx = -1
    }
  }

  const unSelectAll = () => {
    selValue.length = 0
    emit('update:modelValue', selValue)
  }

  return {
    select,
    selectAll,
    selValue,
    unSelect,
    unSelectAll
  }
}

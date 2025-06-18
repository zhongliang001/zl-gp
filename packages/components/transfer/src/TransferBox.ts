import { ref } from 'vue'
import type { TransferOption } from './types'

export const useTransferBox = (filter: boolean, options: TransferOption[]) => {
  const value = ref()
  const selIdx = ref(-1)
  const handlerEnd = (target: EventTarget | null) => {
    const t = target as HTMLInputElement | null
    value.value = t?.value
  }

  const toSelect = (index: number) => {
    if (!options[index].disabled) {
      selIdx.value = index
    }
  }

  const reset = () => {
    selIdx.value = -1
  }

  return {
    value,
    selIdx,
    handlerEnd,
    toSelect,
    reset
  }
}

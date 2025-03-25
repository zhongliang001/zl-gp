import type { Ref } from 'vue'

export interface PaginationProps {
  total: number
}

export const usePagination = (currenPageNum: Ref<number>, props: PaginationProps) => {
  const total = props.total

  const gto = (num: number) => {
    currenPageNum.value = num
  }

  const next = () => {
    if (currenPageNum.value !== total) {
      currenPageNum.value++
    }
  }

  const prev = () => {
    if (currenPageNum.value !== 1) {
      currenPageNum.value--
    }
  }

  const selPage = (num: number) => {
    currenPageNum.value = num
  }

  return {
    gto,
    next,
    prev,
    selPage
  }
}

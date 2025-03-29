import type { Ref } from 'vue'

export interface PaginationProps {
  pageNum: number
}

export const usePagination = (currenPageNum: Ref<number>, props: PaginationProps) => {
  const pageNum = props.pageNum

  const gto = (num: number) => {
    currenPageNum.value = num
  }

  const next = () => {
    if (currenPageNum.value !== pageNum) {
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
    console.log(currenPageNum.value)
  }

  return {
    gto,
    next,
    prev,
    selPage
  }
}

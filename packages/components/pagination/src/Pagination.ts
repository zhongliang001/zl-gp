import type { Ref } from 'vue'

export interface PaginationProps {
  pageNum: number
}

export interface Pagination {
  currentPageNum: Ref<number>
}

export const usePagination = (currentPageNum: Ref<number>, props: PaginationProps) => {
  const pageNum = props.pageNum

  const gto = (num: number) => {
    currentPageNum.value = num
  }

  const next = () => {
    if (currentPageNum.value !== pageNum) {
      currentPageNum.value++
    }
  }

  const prev = () => {
    if (currentPageNum.value !== 1) {
      currentPageNum.value--
    }
  }

  const selPage = (num: number) => {
    currentPageNum.value = num
  }

  return {
    gto,
    next,
    prev,
    selPage
  }
}

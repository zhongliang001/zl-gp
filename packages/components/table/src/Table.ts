import { reactive, ref, type InjectionKey, type Reactive, type Ref } from 'vue'
import type { TableColumn } from './TableColumn'

export interface TableProps {
  data: { [key: string]: string | number }[]
  isIndex?: boolean
  isShowChecked?: boolean
  selType?: 'single' | 'multiple'
}

export interface Store {
  data: Ref<{ [key: string]: string | number }[]>
  columns: Reactive<TableColumn[]>
  isIndex: boolean
  isShowChecked: boolean
  selType: 'single' | 'multiple'
  select: (index: number) => void
  selIndx: Ref<number>
  selMulInd: Ref<number[]>
  unSelect: () => void
}

export const TableInjectkey: InjectionKey<TableContext> = Symbol('TableInjectkey')

export type TableContext = {
  addColumn: (column: TableColumn) => void
  columns: TableColumn[]
  data: { [key: string]: string | number }[]
}

export type TableInstance = {
  ref: Ref
  getSel: () => { [key: string]: string | number } | { [key: string]: string | number }[]
}

export const useTable = (prop: TableProps) => {
  const data = prop.data
  const selIndx = ref(-1)
  const selMulInd = ref<number[]>([])

  const columns = reactive<TableColumn[]>([])
  const addColumn = (column: TableColumn) => {
    columns.push(column)
  }

  const getSel = (): { [key: string]: string | number } | { [key: string]: string | number }[] => {
    if (prop.selType === 'single') {
      if (selIndx.value > data.length - 1) {
        return {}
      } else {
        return data[selIndx.value]
      }
    } else {
      if (selMulInd.value.length === 0) {
        return []
      } else {
        return data.filter((d: { [key: string]: string | number }, idx: number) => {
          if (selMulInd.value.indexOf(idx) !== -1) {
            return d
          }
        })
      }
    }
  }

  const select = (index: number) => {
    if (prop.selType === 'single') {
      selIndx.value = index
    } else {
      if (selMulInd.value.indexOf(index) === -1) {
        selMulInd.value.push(index)
      } else {
        selMulInd.value.splice(selMulInd.value.indexOf(index))
      }
    }
  }

  const unSelect = () => {
    if (prop.selType === 'single') {
      selIndx.value = -1
    } else {
      selMulInd.value.splice(0, selMulInd.value.length)
    }
  }

  return {
    addColumn,
    columns,
    getSel,
    select,
    selIndx,
    selMulInd,
    unSelect
  }
}

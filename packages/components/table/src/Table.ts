import { reactive, ref, type InjectionKey, type Ref } from 'vue'
import type { TableColumn } from './TableColumn'

export interface TableProps {
  data: { [key: string]: string }[]
  isIndex: boolean
  isShowChecked: boolean
  selType: 'single' | 'multiple' | 'not-optional'
}

export const TableInjectkey: InjectionKey<TableContext> = Symbol('TableInjectkey')

export type TableContext = {
  addColumn: (column: TableColumn) => void
  columns: TableColumn[]
  data: { [key: string]: string }[]
}

export type TableInstance = {
  ref: Ref
  getSel: () => { [key: string]: string } | { [key: string]: string }[]
}

export const useTable = (prop: TableProps) => {
  const data = prop.data
  const selIndx = ref(-1)
  const selMulInd = ref<number[]>([])

  const columns = reactive<TableColumn[]>([])
  const addColumn = (column: TableColumn) => {
    columns.push(column)
  }

  const getSel = (): { [key: string]: string } | { [key: string]: string }[] => {
    if (prop.selType === 'not-optional') {
      console.warn('表格数据不可选,不能调用此方法')
      return {}
    }
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
        return data.filter((d: { [key: string]: string }, idx: number) => {
          if (selMulInd.value.indexOf(idx) !== -1) {
            return d
          }
        })
      }
    }
  }

  const select = (index: number) => {
    if (prop.selType === 'not-optional') {
      selIndx.value = -1
      return
    }
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

  return {
    addColumn,
    columns,
    getSel,
    select
  }
}

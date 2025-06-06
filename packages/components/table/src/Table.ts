import { reactive, ref, type InjectionKey } from 'vue'
import remove from 'lodash-es/remove'
import type { TableColumn, TableContext, TableProps } from './types'

export const TableInjectkey: InjectionKey<TableContext> = Symbol('TableInjectkey')

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
        remove(selMulInd.value, (selVal) => {
          return selVal === index
        })
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

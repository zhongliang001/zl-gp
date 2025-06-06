import type { Reactive, Ref, SetupContext } from 'vue'

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

export type TableContext = {
  addColumn: (column: TableColumn) => void
  columns: TableColumn[]
  data: { [key: string]: string | number }[]
}

export interface TableBodyProps {
  store: Store
}

export interface TableColumn {
  name: string
  props: string
  slots?: SetupContext['slots']
}

export interface TableHeaderProps {
  store: Store
  isIndex: boolean
  isShowChecked: boolean
}

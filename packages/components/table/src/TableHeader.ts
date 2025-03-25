import type { Ref } from 'vue'
import type { TableColumn } from './TableColumn'

export interface TableHeaderProps {
  store: {
    data: Ref<{ [key: string]: string }[]>
    columns: TableColumn[]
  }
  isIndex: boolean
  isShowChecked: boolean
}

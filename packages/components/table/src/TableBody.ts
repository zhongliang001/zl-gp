import type { Ref } from 'vue'
import type { TableColumn } from './TableColumn'

export interface TableBodyProps {
  store: {
    data: Ref<{ [key: string]: string }[]>
    columns: TableColumn[]
  }
}

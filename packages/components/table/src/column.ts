import { computed, inject } from 'vue'
import { TableInjectkey, type TableContext } from './Table'

export const genColumnInfo = () => {
  const tableContext: TableContext | undefined = inject(TableInjectkey)

  const columnsData = computed(() => {
    if (tableContext) {
      return {
        columns: tableContext.columns,
        data: tableContext.data
      }
    } else {
      return {
        columns: [],
        data: []
      }
    }
  })

  return {
    columns: columnsData.value.columns,
    data: columnsData.value.data
  }
}

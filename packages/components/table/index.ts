import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Table from './src/Table.vue'
import TableBody from './src/TableBody.vue'
import TableColumn from './src/TableColumn.vue'
import TableHeader from './src/TableHeader.vue'

export const ZlTable: SFCWithInstall<typeof Table> = withInstall(Table)

export const ZlTableBody: SFCWithInstall<typeof TableBody> = withInstall(TableBody)

export const ZlTableColumn: SFCWithInstall<typeof TableColumn> = withInstall(TableColumn)

export const ZlTableHeader: SFCWithInstall<typeof TableHeader> = withInstall(TableHeader)

export * from './src/Table'
export * from './src/instances'
export * from './src/types'

export default ZlTable

import { withInstall } from '../../utils'
import Table from './src/Table.vue'
import TableBody from './src/TableBody.vue'
import TableColumn from './src/TableColumn.vue'
import TableHeader from './src/TableHeader.vue'

export const ZlTable = withInstall(Table)

export const ZlTableBody = withInstall(TableBody)

export const ZlTableColumn = withInstall(TableColumn)

export const ZlTableHeader = withInstall(TableHeader)

export * from './src/Table'

export default { ZlTable, ZlTableBody, ZlTableColumn, ZlTableHeader }

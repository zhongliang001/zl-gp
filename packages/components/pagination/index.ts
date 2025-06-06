import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Pagination from './src/Pagination.vue'

export const ZlPagination: SFCWithInstall<typeof Pagination> = withInstall(Pagination)

export * from './src/Pagination'
export * from './src/instances'
export * from './src/types'

export default ZlPagination

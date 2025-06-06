import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Row from './src/Row.vue'

export const ZlRow: SFCWithInstall<typeof Row> = withInstall(Row)

export default ZlRow

export * from './src/instances'
export * from './src/types'

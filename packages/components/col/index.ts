import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Col from './src/Col.vue'

export const ZlCol: SFCWithInstall<typeof Col> = withInstall(Col)

export default ZlCol
export * from './src/instances'
export * from './src/types'

import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Header from './src/Header.vue'

export const ZlHeader: SFCWithInstall<typeof Header> = withInstall(Header)

export default ZlHeader
export * from './src/instances'
export * from './src/types'

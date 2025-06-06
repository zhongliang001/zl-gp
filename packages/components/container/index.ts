import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Container from './src/Container.vue'

export const ZlContainer: SFCWithInstall<typeof Container> = withInstall(Container)
export default ZlContainer
export * from './src/instances'
export * from './src/types'

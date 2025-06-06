import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Aside from './src/Aside.vue'

export const ZlAside: SFCWithInstall<typeof Aside> = withInstall(Aside)

export default ZlAside
export * from './src/instances'

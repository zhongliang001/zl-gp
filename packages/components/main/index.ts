import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Main from './src/Main.vue'

export const ZlMain: SFCWithInstall<typeof Main> = withInstall(Main)

export default ZlMain
export * from './src/instances'

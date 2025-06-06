import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Switch from './src/Switch.vue'

export const ZlSwitch: SFCWithInstall<typeof Switch> = withInstall(Switch)

export default ZlSwitch

export * from './src/instances'
export * from './src/Switch'
export * from './src/types'

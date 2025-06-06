import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Icon from './src/Icon.vue'

export const ZlIcon: SFCWithInstall<typeof Icon> = withInstall(Icon)
export default ZlIcon
export * from './src/instances'
export * from './src/types'

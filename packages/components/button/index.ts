import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Button from './src/Button.vue'

export const ZlButton: SFCWithInstall<typeof Button> = withInstall(Button)
export default ZlButton
export * from './src/Button'
export * from './src/types'
export type { ButtonInstance } from './src/instances'

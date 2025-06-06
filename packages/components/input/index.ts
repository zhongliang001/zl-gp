import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Input from './src/Input.vue'

export * from './src/Input'

export const ZlInput: SFCWithInstall<typeof Input> = withInstall(Input)

export default ZlInput
export * from './src/instances'

import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import FileInput from './src/FileInput.vue'

export const ZlFileInput: SFCWithInstall<typeof FileInput> = withInstall(FileInput)

export default ZlFileInput

export * from './src/FileInput'
export * from './src/instances'
export * from './src/types'

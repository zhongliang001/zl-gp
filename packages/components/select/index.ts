import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Select from './src/Select.vue'
import SelectOption from './src/SelectOption.vue'

export const ZlSelect: SFCWithInstall<typeof Select> = withInstall(Select)

export const ZlSelectOption: SFCWithInstall<typeof SelectOption> = withInstall(SelectOption)

export default ZlSelect

export * from './src/instances'
export * from './src/types'

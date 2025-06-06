import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import DatePicker from './src/DatePicker.vue'

export const ZlDatePicker: SFCWithInstall<typeof DatePicker> = withInstall(DatePicker)
export default ZlDatePicker

export * from './src/types'
export * from './src/DatePicker'
export * from './src/instances.ts'

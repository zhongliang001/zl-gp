import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'

export const ZlForm: SFCWithInstall<typeof Form> = withInstall(Form)

export const ZlFormItem: SFCWithInstall<typeof FormItem> = withInstall(FormItem)

export * from './src/Form'
export * from './src/instances'
export * from './src/types'

export default ZlForm

import { withInstall } from '../../utils'
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'

export const ZlForm = withInstall(Form)

export const ZlFormItem = withInstall(FormItem)

export * from './src/Form'

export default { ZlForm, ZlFormItem }

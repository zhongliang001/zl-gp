import { withInstall } from '../../utils'
import Select from './src/Select.vue'
import SelectOption from './src/SelectOption.vue'

export const ZlSelect = withInstall(Select)

export const ZlSelectOption = withInstall(SelectOption)

export default { ZlSelect, ZlSelectOption }

import { makeInstaller } from '../../utils'
import * as components from './components'

const componentList = Object.values(components) // 获取所有导出的组件

export default makeInstaller(componentList)

import { withInstall } from '@zl-gp/utils'
import Tabs from './src/Tabs.vue'
import TabPanel from './src/TabPanel.vue'

export const ZlTabs = withInstall(Tabs)

export const ZlTabPanel = withInstall(TabPanel)

export * from './src/instances'
export * from './src/Tabs'
export * from './src/TabPanel'
export * from './src/types'

export default ZlTabs

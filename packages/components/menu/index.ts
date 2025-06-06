import Menu from './src/Menu.vue'
import MenuItem from './src/MenuItem.vue'
import MenuSub from './src/MenuSub.vue'
import { withInstall, type SFCWithInstall } from '@zl-gp/utils'

export const ZlMenu: SFCWithInstall<typeof Menu> = withInstall(Menu)

export const ZlMenuItem: SFCWithInstall<typeof MenuItem> = withInstall(MenuItem)

export const ZlMenuSub: SFCWithInstall<typeof MenuSub> = withInstall(MenuSub)

export default ZlMenu
export * from './src/instances'
export * from './src/types'

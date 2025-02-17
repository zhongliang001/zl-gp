import Menu from './src/Menu.vue'
import MenuItem from './src/MenuItem.vue'
import MenuSub from './src/MenuSub.vue'
import { withInstall } from '../../utils'

export const ZlMenu = withInstall(Menu)

export const ZlMenuItem = withInstall(MenuItem)

export const ZlMenuSub = withInstall(MenuSub)

export default { ZlMenu, ZlMenuItem, ZlMenuSub }

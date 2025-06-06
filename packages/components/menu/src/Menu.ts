import type { InjectionKey } from 'vue'
import type { MenuContext, MenuProps } from './types'

export const MenuInjectKey: InjectionKey<MenuContext> = Symbol('menuInjectKey')

export const useMenu = (props: MenuProps) => {
  const _props = {
    style: {
      'flex-direction': props.flex
    }
  }

  return {
    _props
  }
}

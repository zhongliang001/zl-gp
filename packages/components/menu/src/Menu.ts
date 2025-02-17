import type { InjectionKey } from 'vue'

export const MenuInjectKey: InjectionKey<MenuContext> = Symbol('menuInjectKey')

export interface MenuProps {
  is: string
  ch: string
}

export interface MenuItemProp {
  prop: string
}

export type MenuContext = {
  selected: string
  select: (ele: string) => void
}

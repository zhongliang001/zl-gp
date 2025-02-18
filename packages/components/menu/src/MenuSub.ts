import type { InjectionKey } from 'vue'

export const MenuSubInjectKey: InjectionKey<MenuSubContext> = Symbol('menuSubInjectKey')

export interface MenuSubProp {
  prop: string
  name: string
}

export type MenuSubContext = {
  prop: string
}

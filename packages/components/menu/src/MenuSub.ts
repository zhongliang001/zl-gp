import type { InjectionKey } from 'vue'
import type { MenuSubContext } from './types'

export const MenuSubInjectKey: InjectionKey<MenuSubContext> = Symbol('menuSubInjectKey')

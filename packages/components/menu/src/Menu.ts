import type { InjectionKey } from 'vue'

export const MenuInjectKey: InjectionKey<MenuContext> = Symbol('menuInjectKey')

export interface MenuProps {
  is?: string
  flex?: 'row' | 'column'
}

export type MenuContext = {
  selected: string
  select: (ele: string) => void
  subSelected: string
  subSelect: (ele: string) => void
  unSubSelect: () => void
  flex: 'row' | 'column'
}

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

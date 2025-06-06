import { type RouterLinkProps } from 'vue-router'

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

export interface MenuItemProp extends RouterLinkProps {
  prop: string
}

export interface MenuSubProp {
  prop: string
  name: string
}

export type MenuSubContext = {
  prop: string
}

import type { Reactive } from 'vue'

export interface TabProps {
  isMenu?: boolean
  closeable: boolean
}

export type TabsContext = {
  addChildren: (name: string) => void
  selName: Reactive<{ name?: string }>
}

export interface TabPanelProps {
  name: string
  forTab: boolean
}

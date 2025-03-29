import type { Ref, SetupContext } from 'vue'

export interface TableColumn {
  name: string
  props: string
  slots?: SetupContext['slots']
}

export type Instance = {
  ref: Ref<HTMLDivElement | null>
}

import type { Ref } from 'vue'
import type { CheckboxIntance } from '../../checkbox'
export interface TreeProps {
  data: TreeBranch[]
  checkable: boolean
  expand?: boolean
}

export interface TreeBranch {
  name: string
  value: string
  nodeId?: string
  class?: string
  disabled?: boolean
  children?: TreeBranch[]
}

export type TreeContext = {
  data: TreeBranch
  getDta: () => unknown
}

export interface TreeNodeProps {
  nodeData: TreeBranch
  checkable: boolean
  expand?: boolean
  modelValue?: string[]
}

export type TreeNodeExport = {
  ref: Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>
  nodeId: string
  checked: () => void
  checkboxRef: CheckboxIntance
  halfSelected: Ref<boolean>
  getSelectCount: () => number
  getSelectedTreeNode: () => TreeNodeExport[]
  treeNodeRefs: TreeNodeExport[]
  selectValue: []
  update: () => void
  unchecked: () => void
  getTreeNodeByNodeId: (nodeId: string) => TreeNodeExport | undefined
}

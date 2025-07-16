import type { Ref } from 'vue'
import type { TreeNodeExport } from './types'

export const getNodeByNodeId = (nodeId: string, treeNodeRefs: Ref<TreeNodeExport[]>) => {
  const nodeIds = treeNodeRefs.value.filter((node) => {
    return node.nodeId === nodeId
  })
  if (nodeIds.length > 0) {
    return nodeIds[0]
  }
  for (const node of treeNodeRefs.value) {
    if (node.treeNodeRefs && node.treeNodeRefs.length > 0) {
      const found = node.getTreeNodeByNodeId?.(nodeId)
      if (found) {
        return found
      }
    }
  }
  return undefined
}

export const getSelectedNode = (treeNodeRefs: Ref<TreeNodeExport[]>) => {
  const selectedTreeNodes = []
  selectedTreeNodes.push(
    ...treeNodeRefs.value.filter((nodeRef) => {
      return nodeRef.selectValue.length > 0 && !nodeRef.halfSelected
    })
  )
  treeNodeRefs.value.forEach((nodeRef) => {
    if (nodeRef.getSelectedTreeNode()) {
      selectedTreeNodes.push(...nodeRef.getSelectedTreeNode())
    }
  })
  return selectedTreeNodes
}

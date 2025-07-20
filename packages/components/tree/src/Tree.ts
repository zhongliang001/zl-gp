import { remove } from 'lodash-es'
import { ref, type Ref } from 'vue'
import type { TreeNodeExport, TreeProps } from './types'
import { getNodeByNodeId, getSelectedNode } from './common'

export const useTree = (treeNodeRefs: Ref<TreeNodeExport[]>, props: TreeProps) => {
  const expandIndex = ref<number[]>([])
  const checkable = props.checkable
  const telescoping = (index: number) => {
    if (expandIndex.value?.indexOf(index) === -1) {
      expandIndex.value.push(index)
    } else {
      if (expandIndex.value) {
        remove(expandIndex.value, (item) => item === index)
      }
    }
  }

  const getTreeNodeByNodeId = (nodeId: string) => {
    return getNodeByNodeId(nodeId, treeNodeRefs)
  }

  const getSelectedTreeNode = () => {
    return getSelectedNode(treeNodeRefs)
  }

  const getSelectedValue = () => {
    const selectedNode = getSelectedNode(treeNodeRefs)
    const selectedValue: unknown[] = []
    if (selectedNode && selectedNode.length > 0) {
      selectedNode.forEach((node) => {
        selectedValue.push(...node.selectValue)
      })
    }
    return selectedValue
  }

  const selectAll = () => {
    if (!checkable) {
      return
    }
    treeNodeRefs.value.forEach(node => {
      node.checked()
    })
  }

  const unselectAll = () => {
    if (!checkable) {
      return
    }
    treeNodeRefs.value.forEach(node => {
      node.unchecked()
    })
  }

  return {
    expandIndex,
    getTreeNodeByNodeId,
    getSelectedTreeNode,
    getSelectedValue,
    selectAll,
    telescoping,
    unselectAll
  }
}

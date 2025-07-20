import { nextTick, ref, watch, type Ref } from 'vue'
import { type CheckboxIntance } from '../../checkbox'
import { remove } from 'lodash-es'
import type { TreeNodeExport, TreeNodeProps } from './types'
import { getNodeByNodeId, getSelectedNode } from './common'

export const useTreeNode = (
  props: TreeNodeProps,
  checkboxRef: Ref<CheckboxIntance | undefined>,
  treeNodeRefs: Ref<TreeNodeExport[]>,
  emit: (event: 'update', ...args: unknown[]) => void
) => {
  const expand = ref<boolean | undefined>(props.expand)
  const selectValue = ref<string[]>([])
  const value = props.nodeData.value
  const halfSelected = ref<boolean>(false)
  watch(
    () => checkboxRef.value?.selected,
    async (newVal, oldVal) => {
      await nextTick()
      if (newVal !== oldVal) {
        emit('update')
      }
    },
    {
      deep: true
    }
  )
  const change = async () => {
    const checked = checkboxRef.value?.selected
    // 当此分支被选择时子分支会自动选择
    treeNodeRefs.value.forEach((entry: TreeNodeExport) => {
      if (entry.checkboxRef) {
        if (checked) {
          entry.checkboxRef.select()
        } else {
          entry.checkboxRef.unselect()
        }
      }
    })
  }

  const click = async () => {
    expand.value = !expand.value
  }

  const getSelectCount = () => {
    return treeNodeRefs.value.filter((entry) => entry.checkboxRef?.selected && !entry.halfSelected)
      .length
  }

  // 子元素修改时修改父节点状态
  const update = () => {
    const selectedCount = getSelectCount()
    if (!checkboxRef.value) {
      return
    }
    if (selectedCount === 0) {
      const halfSelectedCount = treeNodeRefs.value.filter((entry) => entry.halfSelected).length
      if (halfSelectedCount > 0) {
        checkboxRef.value?.indeterminate()
        halfSelected.value = true
      } else {
        if (selectValue.value.indexOf(value) !== -1) {
          remove(selectValue.value, (ch) => ch === value)
        } else {
          checkboxRef.value.changecheckState('checkbox_unchecked')
        }
        halfSelected.value = false
      }
    } else if (selectedCount < treeNodeRefs.value.length) {
      checkboxRef.value?.indeterminate()
      halfSelected.value = true
    } else {
      if (selectValue.value.indexOf(value) === -1) {
        selectValue.value.push(value)
      } else {
        checkboxRef.value.changecheckState('checkbox_checked')
      }
      halfSelected.value = false
    }
    emit('update')
  }

  const getTreeNodeByNodeId = (nodeId: string) => {
    return getNodeByNodeId(nodeId, treeNodeRefs)
  }

  const getSelectedTreeNode = () => {
    return getSelectedNode(treeNodeRefs)
  }

  const checked = () => {
    if (!checkboxRef.value?.selected || halfSelected) {
      checkboxRef.value?.select()
    }
  }

  const unchecked = () => {
    if (checkboxRef.value?.selected || halfSelected) {
      checkboxRef.value?.unselect()
    }
  }

  return {
    change,
    click,
    checked,
    expand,
    getSelectCount,
    getSelectedTreeNode,
    getTreeNodeByNodeId,
    halfSelected,
    selectValue,
    unchecked,
    update
  }
}

<script setup lang="ts">
import { usenamespace } from '@zl-gp/hooks'
import type { TreeNodeExport, TreeProps } from './types'
import { ref, type Ref } from 'vue'
import { useTree, ZlTreeNode } from '..'

defineOptions({
  name: 'ZlTree'
})

const props = defineProps<TreeProps>()

const _ref = ref<HTMLDivElement>()
const treeNodeRefs = ref([]) as Ref<TreeNodeExport[]>
const { namespace } = usenamespace('tree')
const { getTreeNodeByNodeId, getSelectedTreeNode, getSelectedValue, selectAll, unselectAll } =
  useTree(treeNodeRefs, props)

defineExpose({
  ref: _ref,
  getTreeNodeByNodeId,
  getSelectedTreeNode,
  getSelectedValue,
  selectAll,
  unselectAll
})
</script>
<template>
  <div ref="_ref" :class="namespace.className">
    <div class="trunk">
      <template v-for="(item, index) in data" :key="index">
        <ZlTreeNode
          ref="treeNodeRefs"
          :index="index"
          :node-data="item"
          :checkable="checkable"
          :expand="expand"></ZlTreeNode>
      </template>
    </div>
  </div>
</template>
<style lang="css">
@import url(Tree.scss);
</style>

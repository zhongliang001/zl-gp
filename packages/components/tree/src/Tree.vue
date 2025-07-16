<script setup lang="ts">
import { usenamespace } from '@zl-gp/hooks'
import type { TreeNodeExport, TreeProps } from './types'
import { ref, type Ref } from 'vue'
import { useTree, ZlTreeNode } from '..'

defineOptions({
  name: 'ZlTree'
})

const { data, expand } = defineProps<TreeProps>()

const _ref = ref<HTMLDivElement>()
const treeNodeRefs = ref([]) as Ref<TreeNodeExport[]>
const { namespace } = usenamespace('tree')
const { getTreeNodeByNodeId, getSelectedTreeNode, getSelectedValue } = useTree(treeNodeRefs)

defineExpose({
  ref: _ref,
  getTreeNodeByNodeId,
  getSelectedTreeNode,
  getSelectedValue
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

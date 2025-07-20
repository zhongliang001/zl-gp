<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { TreeNodeExport, TreeNodeProps } from './types'
import ZlCheckbox, { type CheckboxIntance } from '../../checkbox'
import { useTreeNode } from './TreeNode'
import ZlIcon from '../../icon'

defineOptions({
  name: 'ZlTreeNode'
})

const props = defineProps<TreeNodeProps>()

const _ref = ref<HTMLDivElement>()

const checkboxRef = ref<CheckboxIntance>()

const treeNodeRefs = ref([]) as Ref<TreeNodeExport[]>

const emit = defineEmits(['update'])

const {
  change,
  checked,
  click,
  expand,
  getSelectCount,
  getSelectedTreeNode,
  getTreeNodeByNodeId,
  halfSelected,
  selectValue,
  unchecked,
  update
} = useTreeNode(props, checkboxRef, treeNodeRefs, emit)

defineExpose({
  ref: _ref,
  checked,
  nodeId: props.nodeData.nodeId,
  expand,
  getSelectCount,
  getTreeNodeByNodeId,
  getSelectedTreeNode,
  treeNodeRefs,
  checkboxRef,
  halfSelected,
  selectValue,
  unchecked,
  update
})
</script>
<template>
  <div ref="_ref" class="branch" :class="nodeData.class" @click.stop="click()">
    <ZlIcon :name="expand ? 'shrink' : 'unfold'" :width="20" :height="20"></ZlIcon>
    <ZlCheckbox
      ref="checkboxRef"
      v-if="checkable"
      :label="nodeData.name"
      :value="nodeData.value"
      :disabled="nodeData.disabled"
      v-model="selectValue"
      @change="change"></ZlCheckbox>
    <template v-for="(item, chindex) in nodeData.children" :key="chindex">
      <Transition name="tree">
        <ZlTreeNode
          v-show="expand"
          ref="treeNodeRefs"
          :index="chindex"
          :node-data="item"
          :checkable="checkable"
          :expand="expand"
          @update="update"></ZlTreeNode>
      </Transition>
    </template>
  </div>
</template>

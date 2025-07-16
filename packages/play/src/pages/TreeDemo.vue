<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive([
  {
    name: '一年级',
    value: '1',
    children: [
      {
        name: '1班',
        value: '11',
        children: [
          {
            name: '张三',
            value: 'zs'
          },
          {
            name: '李四',
            value: 'ls'
          }
        ]
      },
      {
        name: '2班',
        value: '12'
      }
    ]
  },
  {
    name: '二年级',
    value: '2',
    children: [
      {
        name: '1班',
        value: '21',
        children: [
          {
            name: '张三',
            value: 'zs'
          }
        ]
      }
    ]
  }
])

const nodeData = {
  name: '父节点',
  value: 'parent',
  class: '',
  disabled: false,
  children: [
    { name: '子节点1', value: 'child1', class: '', disabled: false, children: [] },
    { name: '子节点2', value: 'child2', class: '', disabled: false, children: [] }
  ]
}
</script>
<template>
  <zl-tree :data="data" :checkable="true" :expand="true"></zl-tree>
  <div class="node">
    <zl-tree-node :nodeData="nodeData"></zl-tree-node>
  </div>
</template>

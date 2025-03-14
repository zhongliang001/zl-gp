<script lang="ts" setup>
import { h, nextTick, onMounted, ref, shallowRef, watch, type VNode } from 'vue'
import type { TableBodyProps } from './TableBody'

defineOptions({
  name: 'ZlTableBody'
})

const _ref = ref<HTMLTableElement | null>(null)

const { store } = defineProps<TableBodyProps>()

const tbody = shallowRef<VNode>(h('div', '动态内容'))

watch(
  () => [store.data.value],
  (value) => {
    if (value) {
      genTableBody()
    }
  },
  {
    deep: true
  }
)

onMounted(() => {
  nextTick(() => {
    genTableBody()
  })
})

const genTableBody = () => {
  const children: VNode[] = []
  store.data.value.forEach((dt, index) => {
    const childNodes: VNode[] = []
    const scope = {
      row: dt,
      $index: index
    }
    if (dt) {
      store.columns?.forEach((column) => {
        if (column.slots && column.slots.default) {
          const nodes: VNode[] = column.slots.default(scope)
          nodes.forEach((n) => {
            if (n.type === Comment) {
              return n
            }
          })
          childNodes.push(h('td', { key: 1 }, { default: () => [nodes] }))
        } else {
          const node = h('td', dt[column.props])
          childNodes.push(node)
        }
      })
    }
    if (childNodes.length != 0) {
      const node = h('tr', {}, { default: () => childNodes })
      children.push(node)
    }
  })
  tbody.value = h('tbody', children)
}

defineExpose({
  ref: _ref
})
</script>
<template>
  <component :is="tbody" />
</template>

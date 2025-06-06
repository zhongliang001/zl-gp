<script lang="ts" setup>
import { h, nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import { useTableBody } from './TableBody'
import type { TableBodyProps } from './types'

defineOptions({
  name: 'ZlTableBody'
})

const _ref = ref<HTMLTableElement | null>(null)

const { store } = defineProps<TableBodyProps>()

const tbody = shallowRef(h('template'))
const { genTableBody } = useTableBody(store, tbody)

watch(
  () => [store.data.value],
  (value) => {
    if (value) {
      // 数据发生变化清除所有被选择的记录
      store.unSelect()
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

defineExpose({
  ref: _ref
})
</script>
<template>
  <component :is="tbody" />
</template>

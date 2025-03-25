<script lang="ts" setup>
import { h, nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import { useTableBody, type TableBodyProps } from './TableBody'

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

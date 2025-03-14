<script lang="ts" setup>
import { computed, provide, reactive, ref } from 'vue'
import { TableInjectkey, useTable, type TableInstance, type TableProps } from './Table'
import { usenamespace } from '@zl-gp/hooks'

defineOptions({
  name: 'ZlTable'
})

const props = withDefaults(defineProps<TableProps>(), {
  isIndex: false,
  isShowChecked: false,
  selType: 'not-optional'
})

const { addColumn, columns, getSel } = useTable(props)
const _ref = ref<HTMLTableElement | null>(null)

const { namespace } = usenamespace('table')

provide(
  TableInjectkey,
  reactive({
    addColumn,
    columns,
    data: props.data
  })
)

const store = computed(() => {
  return { data: ref(props.data), columns: columns }
})

defineExpose(
  reactive<TableInstance>({
    ref: _ref,
    getSel
  })
)
</script>
<template>
  <table ref="_ref" :class="namespace.className">
    <zl-table-header :isIndex="isIndex" :isShowChecked="isShowChecked"></zl-table-header>
    <zl-table-body :store="store"></zl-table-body>
  </table>
  <slot></slot>
</template>
<style lang="css">
@import url('Table.scss');
</style>

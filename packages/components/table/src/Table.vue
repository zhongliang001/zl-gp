<script lang="ts" setup>
import { computed, provide, reactive, ref, type Ref } from 'vue'
import { TableInjectkey, useTable, type Store, type TableInstance, type TableProps } from './Table'
import { usenamespace } from '@zl-gp/hooks'
import { ZlTableBody, ZlTableHeader } from '..'

defineOptions({
  name: 'ZlTable'
})

const props = withDefaults(defineProps<TableProps>(), {
  isIndex: false,
  isShowChecked: false,
  selType: 'single'
})

const { addColumn, columns, getSel, select, selIndx, selMulInd, unSelect } = useTable(props)
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

const store: Ref<Store> = computed(() => {
  return {
    data: ref(props.data),
    columns: columns,
    isIndex: props.isIndex,
    isShowChecked: props.isShowChecked,
    selType: props.selType,
    select: select,
    selIndx: selIndx,
    selMulInd: selMulInd,
    unSelect: unSelect
  }
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
    <ZlTableHeader :store="store" :isIndex="isIndex" :isShowChecked="isShowChecked"></ZlTableHeader>
    <ZlTableBody :store="store"></ZlTableBody>
  </table>
  <slot></slot>
</template>
<style lang="css">
@import url('Table.scss');
</style>

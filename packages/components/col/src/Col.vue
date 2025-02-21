<script setup lang="ts">
import { usenamespace } from '@zl-gp/hooks'
import { RowInjectKey, type RowContext } from '@zl-gp/components/row/src/Row'
import { inject, onMounted } from 'vue'
import useCol, { type ColProps } from './Col'
defineOptions({
  name: 'ZlCol'
})
const { namespace } = usenamespace('col')

const props = withDefaults(defineProps<ColProps>(), {
  span: 1,
  offset: 0
})

const rowContext: RowContext | undefined = inject(RowInjectKey)
const gutter: number = rowContext ? (rowContext.gutter ? rowContext.gutter : 0) : 0
const addCol = rowContext ? rowContext.addCol : undefined

onMounted(() => {
  if (addCol) {
    addCol(props.span, props.offset)
  }
})

const { _prop } = useCol(props, gutter, rowContext)
</script>
<template>
  <div :class="namespace.className" v-bind="_prop">
    <slot></slot>
  </div>
</template>

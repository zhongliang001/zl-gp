<script lang="ts" setup>
import { inject, onMounted, ref, useSlots } from 'vue'
import { TableInjectkey } from './Table'
import type { TableColumn, TableContext } from './types'

defineOptions({
  name: 'ZlTableColumn'
})

const prop = defineProps<TableColumn>()

const _ref = ref<HTMLDivElement | null>(null)

const tableContext: TableContext | undefined = inject(TableInjectkey)
const slots = useSlots()
onMounted(() => {
  if (tableContext) {
    const addColumn = tableContext.addColumn
    if (slots && slots.default) {
      addColumn({
        name: prop.name,
        props: prop.props,
        slots: slots
      })
    } else {
      addColumn({
        name: prop.name,
        props: prop.props,
        slots: {}
      })
    }
  }
})

type Row = { [key: string]: string | number }
type index = number

const row = ref<Row>()
const index = ref<index>()

defineExpose({
  ref: _ref
})
</script>
<template>
  <div ref="_ref">
    <slot :row="row" :index="index"></slot>
  </div>
</template>

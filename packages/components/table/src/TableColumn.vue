<script lang="ts" setup>
import { inject, onMounted, reactive, ref, useSlots } from 'vue'
import type { Instance, TableColumn } from './TableColumn'
import { TableInjectkey, type TableContext } from './Table'

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

defineExpose(
  reactive<Instance>({
    ref: _ref
  })
)
</script>
<template>
  <div ref="_ref">
    <slot></slot>
  </div>
</template>

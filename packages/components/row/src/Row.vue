<script setup lang="ts">
import { usenamespace } from '@zl-gp/hooks'
import { RowInjectKey, type RowProps } from './Row'
import { provide, reactive, ref } from 'vue'

defineOptions({
  name: 'ZlRow'
})

const { gutter = 0, columns } = defineProps<RowProps>()

const num = ref(0)

const addCol = (span: number, offset: number) => {
  if (columns) {
    num.value = columns
    return
  }
  num.value = num.value + span + offset
}

provide(
  RowInjectKey,
  reactive({
    gutter,
    addCol,
    num
  })
)

const { namespace } = usenamespace('row')
</script>
<template>
  <div :class="namespace.className">
    <slot></slot>
  </div>
</template>
<style lang="css">
@import url('./Row.scss');
</style>

<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import type { TableHeaderProps } from './TableHeader'

defineOptions({
  name: 'ZlTableHeader'
})

const { namespace } = usenamespace('table-header')

const { store } = defineProps<TableHeaderProps>()
</script>
<template>
  <thead :class="namespace.className">
    <th v-if="isIndex"></th>
    <th v-if="isShowChecked"></th>
    <th v-for="(column, index) in store.columns" :key="index">{{ column.name }}</th>
  </thead>
</template>

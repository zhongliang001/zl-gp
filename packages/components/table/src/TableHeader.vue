<script lang="ts" setup>
import type { TableHeaderProps } from './TableHeader'

defineOptions({
  name: 'ZlTableHeader'
})

const { store } = defineProps<TableHeaderProps>()
</script>
<template>
  <thead class="textThead">
    <th v-if="isIndex"></th>
    <th v-if="isShowChecked"></th>
    <th v-for="(column, index) in store.columns" :key="index">{{ column.name }}</th>
  </thead>
</template>

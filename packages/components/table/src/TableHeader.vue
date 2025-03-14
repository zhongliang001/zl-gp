<script lang="ts" setup>
import type { TableHeaderProps } from './TableHeader'
import { genColumnInfo } from './column'

defineOptions({
  name: 'ZlTableHeader'
})

defineProps<TableHeaderProps>()

const { columns } = genColumnInfo()
</script>
<template>
  <thead class="textThead">
    <th v-if="isIndex"></th>
    <th v-if="isShowChecked"></th>
    <th v-for="(column, index) in columns" :key="index">{{ column.name }}</th>
  </thead>
</template>

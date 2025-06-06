<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { TableInstance, PaginationInstance } from 'zl-gp'

const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom2',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom3',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom4',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

const add = () => {
  tableData.push({
    date: '2016-05-01',
    name: 'zzz',
    address: 'No. 189, Grove St, Los Angeles'
  })
}

const table = ref<TableInstance | null>(null)

const getSel = () => {
  if (table.value) {
    const a = table.value.getSel()
    console.log(a)
  }
}

const pagination = ref<PaginationInstance | null>(null)

// const currentPageNum = ref(pagination.value?.currentPageNum)

watch(
  () => pagination.value?.currentPageNum,
  () => {
    console.log(pagination.value?.currentPageNum)
  },
  { deep: true }
)
</script>
<template>
  <!-- <zl-table ref="table" :data="data" :is-index="true" :isShowChecked="true" selType="single">
    <zl-table-column name="testa" props="a"></zl-table-column>
    <zl-table-column name="testb" props="b"></zl-table-column>
  </zl-table> -->

  <zl-table ref="table" :data="tableData" :is-index="true" :isShowChecked="true" selType="single">
    <zl-table-column props="date" name="Date">
      <template #default="scope">
        <template v-if="scope && scope.row">
          <zl-input
            name="test"
            placeholder="请输入"
            type="text"
            v-model="scope.row.date"
          ></zl-input>
        </template>
      </template>
    </zl-table-column>
    <zl-table-column props="name" name="Name">
      <template #default="scope">
        <template v-if="scope && scope.row">
          <zl-input
            name="name"
            placeholder="请输入"
            type="text"
            v-model="scope.row.name"
          ></zl-input>
        </template>
      </template>
    </zl-table-column>
  </zl-table>
  <zl-pagination ref="pagination" :page-num="20"></zl-pagination>
  <zl-button @click="add">add</zl-button>
  <zl-button @click="getSel">getSel</zl-button>
</template>

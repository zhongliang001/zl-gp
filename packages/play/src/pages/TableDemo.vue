<script lang="ts" setup>
import { reactive } from 'vue'

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
</script>
<template>
  <!-- <zl-table ref="table" :data="data" :is-index="true" :isShowChecked="true" selType="single">
    <zl-table-column name="testa" props="a"></zl-table-column>
    <zl-table-column name="testb" props="b"></zl-table-column>
  </zl-table> -->
  <!-- <zl-button @click="getSel">sel</zl-button> -->

  <zl-table :data="tableData">
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
  <zl-button @click="add"></zl-button>
</template>

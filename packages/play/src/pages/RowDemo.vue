<script lang="ts" setup>
const data = {
  stockId: '',
  stockName: '',
  price: '',
  transNum: '',
  transDate: '',
  transType: '',
  transReason: ''
}
</script>
<template>
  <zl-container :width="100">
    <zl-header is="h">新增交易信息</zl-header>
    <zl-main>
      <zl-form :data="data">
        <zl-row :columns="2">
          <zl-col :span="1">
            <zl-form-item label="成交原因" prop="transReason">
              <zl-input name="transReason" type="text" v-model="data.transReason"></zl-input>
            </zl-form-item>
          </zl-col>
        </zl-row>
      </zl-form>
    </zl-main>
  </zl-container>
</template>

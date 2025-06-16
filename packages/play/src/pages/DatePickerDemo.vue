<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive({
  a: ''
})
</script>
<template>
  <zl-form :data="data">
    <zl-row :columns="2">
      <zl-col>
        <zl-form-item prop="s" label="日期选择器">
          <zl-date-picker
            :clearable="true"
            format="YYYYMMDD"
            weekStart="monday"
            v-model="data.a"></zl-date-picker>
        </zl-form-item>
      </zl-col>
    </zl-row>
  </zl-form>
</template>

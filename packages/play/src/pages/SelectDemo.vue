<script lang="ts" setup>
import { ref } from 'vue'

const a = ref('t1')
</script>
<template>
  <zl-select name="select" v-model="a">
    <zl-select-option name="测试1" value="t"></zl-select-option>
    <zl-select-option name="我是" value="t1"></zl-select-option>
    <zl-select-option name="案例1" value="t2"></zl-select-option>
  </zl-select>
</template>

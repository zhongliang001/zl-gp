<script setup lang="ts">
import { reactive } from 'vue'

const options = [
  { value: '1', name: '黑龙江省' },
  { value: '2', name: '辽宁省' },
  { value: '3', name: '山东省', disabled: true },
  { value: '4', name: '吉林省' },
  { value: '5', name: '江苏省' },
  { value: '6', name: '上海市' },
  { value: '7', name: '浙江省' },
  { value: '8', name: '福建省' },
  { value: '9', name: '广东省' }
]
const data = reactive({
  a: []
})
</script>
<template>
  <zl-transfer
    v-model="data.a"
    :filter="true"
    :options="options"
    ltitle="省份列表"
    rtitle="已选省份"></zl-transfer>
</template>

<template>
  <zl-radio name="1" v-model="data.t" value="a">是</zl-radio>
  <zl-radio name="1" v-model="data.t" value="b">否</zl-radio>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  t: ''
})
</script>

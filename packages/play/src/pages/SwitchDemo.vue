<template>
  <div>
    <zl-switch v-model="testData.ch"></zl-switch>
    {{ testData.ch }}
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const testData = ref({
  ch: true
})
</script>

<script setup lang="ts">
import { ref } from 'vue'
import type { AsideProps } from './types'

defineOptions({
  name: 'ZlAside'
})

const _ref = ref<HTMLDivElement>()

const { width = 200 } = defineProps<AsideProps>()

defineExpose({
  ref: _ref
})
</script>
<template>
  <aside ref="_ref" class="zl-aside" :style="[{ width: width + 'px' }]"><slot></slot></aside>
</template>
<style lang="css">
@import './Aside.scss';
</style>

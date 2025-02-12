<script lang="ts" setup>
import type { ContainerProps } from './Container'

defineOptions({
  name: 'ZlContainer'
})
const { width = 100, height = 100 } = defineProps<ContainerProps>()
</script>
<template>
  <div class="zl-container" :style="{ width: width + '%', height: height + '%' }">
    <slot></slot>
  </div>
</template>
<style lang="css">
@import 'Container.scss';
</style>

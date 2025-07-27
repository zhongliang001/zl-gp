<script setup lang="ts">
import type { HeaderProps } from './types'

defineOptions({
  name: 'ZlHeader'
})
const { is = 'h', width = 100, line = false } = defineProps<HeaderProps>()
</script>
<template>
  <header class="zl-header">
    <component :is="is" class="zl-header-com"><slot></slot></component>
    <hr :class="[{ hidden: !line }]" :width="width + '%'" />
  </header>
</template>
<style lang="css">
@import 'Header.scss';
</style>

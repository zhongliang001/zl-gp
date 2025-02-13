<script setup lang="ts">
import type { HeaderProps } from './Header'

defineOptions({
  name: 'ZlHeader'
})
const { hwidth = 100 } = defineProps<HeaderProps>()
</script>
<template>
  <header class="zl-header">
    <component :is="is"><slot></slot></component>
    <hr :width="hwidth + '%'" />
  </header>
</template>
<style lang="css">
@import 'Header.scss';
</style>

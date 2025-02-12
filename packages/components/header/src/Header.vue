<script setup lang="ts">
import type { HeaderProps } from './Header'

defineOptions({
  name: 'ZlHeader'
})
defineProps<HeaderProps>()
</script>
<template>
  <div class="zl-header">
    <component :is="is"><slot></slot></component>
  </div>
</template>

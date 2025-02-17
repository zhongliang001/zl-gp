<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'

defineOptions({
  name: 'ZlMenuSub'
})
const { namespace } = usenamespace('menusub')
</script>
<template>
  <div :class="namespace.className">
    <slot></slot>
  </div>
</template>

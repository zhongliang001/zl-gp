<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { computed, useSlots, type Component, type VNode } from 'vue'
import type { ContainerProps } from './Container'
import { usenamespace } from '@zl-gp/hooks'

defineOptions({
  name: 'ZlContainer'
})

const { namespace } = usenamespace()
const { width = 100 } = defineProps<ContainerProps>()
const slots = useSlots()

const flexed = computed(() => {
  if (slots && slots.default) {
    const vNodes: VNode[] = slots.default({})
    return vNodes.some((vNode: any) => {
      const tag = (vNode.type as Component).name
      return tag === 'ZlAside'
    })
  } else {
    return false
  }
})
</script>
<template>
  <section :class="[[namespace('container')], { flex: flexed }]" :style="{ width: width + '%' }">
    <slot></slot>
  </section>
</template>
<style lang="css">
@import 'Container.scss';
</style>

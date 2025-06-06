<script lang="ts" setup>
import { computed, useSlots, type Component, type VNode } from 'vue'
import type { ContainerProps } from './types'
import { usenamespace } from '@zl-gp/hooks'

defineOptions({
  name: 'ZlContainer'
})

const { namespace } = usenamespace('container')
const { width = 100 } = defineProps<ContainerProps>()
const slots = useSlots()

const flexed = computed(() => {
  if (slots && slots.default) {
    const vNodes: VNode[] = slots.default({})
    return vNodes.some((vNode: VNode) => {
      const tag = (vNode.type as Component).name
      return tag === 'ZlAside'
    })
  } else {
    return false
  }
})
</script>
<template>
  <section :class="[[namespace.className], { flex: flexed }]" :style="{ width: width + '%' }">
    <slot></slot>
  </section>
</template>
<style lang="css">
@import 'Container.scss';
</style>

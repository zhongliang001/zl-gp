<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { useCard } from './Card'
import { ref } from 'vue'
import type { CardProps } from './types'

const prop = withDefaults(defineProps<CardProps>(), {
  height: 150,
  backgroundColor: 'var(--color-white)'
})

const _ref = ref<HTMLDivElement>()

defineOptions({
  name: 'ZlCard'
})

defineExpose({
  ref: _ref
})
const { namespace } = usenamespace('card')

const { _props } = useCard(prop)
</script>
<template>
  <div ref="card" :class="[namespace.className]" v-bind="_props">
    <div
      v-if="$slots.header"
      :class="namespace.cs('header')"
      :style="[{ height: headerHeight + `px` }]"
    >
      <slot name="header"></slot>
      <hr width="100%" />
    </div>
    <div
      v-if="$slots.default"
      :class="namespace.cs('body')"
      :style="[{ height: bodyHeight + `px` }]"
    >
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      :class="namespace.cs('footer')"
      :style="[{ height: footerHeight + `px` }]"
    >
      <hr width="100%" />
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style lang="css">
@import url('./Card.scss');
</style>

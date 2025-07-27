<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { useCard } from './Card'
import { computed, ref } from 'vue'
import type { CardProps } from './types'

defineOptions({
  name: 'ZlCard'
})

const prop = withDefaults(defineProps<CardProps>(), {
  height: 150,
  backgroundColor: 'var(--color-white)',
  titlePosition: 'center',
  footPosition: 'center'
})

const _ref = ref<HTMLDivElement>()

const header = ref<HTMLDivElement>()

const body = ref<HTMLDivElement>()

const footer = ref<HTMLDivElement>()

const { namespace } = usenamespace('card')

const { _props } = useCard(prop)

const bheight = computed(() => {
  if (prop.bodyHeight) {
    return prop.bodyHeight
  }
  const cardHeight = _ref.value?.offsetHeight
  if (!cardHeight) {
    return 0
  }
  const headerHeight = header.value ? header.value.offsetHeight : 0
  const footerHeight = footer.value ? footer.value.offsetHeight : 0
  return cardHeight - headerHeight - footerHeight
})

defineExpose({
  ref: _ref
})
</script>
<template>
  <div ref="_ref" :class="[namespace.className]" v-bind="_props">
    <div
      v-if="$slots.header"
      ref="header"
      :class="[namespace.cs('header'), titlePosition]"
      :style="[{ height: headerHeight + `px` }]">
      <span><slot name="header"></slot></span>
      <hr width="100%" />
    </div>
    <div
      ref="body"
      v-if="$slots.default"
      :class="[namespace.cs('body'), , bodyPosition]"
      :style="[{ height: bheight + `px` }]">
      <span><slot /></span>
    </div>
    <div
      ref="footer"
      v-if="$slots.footer"
      :class="[namespace.cs('footer'), footPosition]"
      :style="[{ height: footerHeight + `px` }]">
      <hr width="100%" />
      <span><slot name="footer"></slot></span>
    </div>
  </div>
</template>
<style lang="css">
@import url('./Card.scss');
</style>

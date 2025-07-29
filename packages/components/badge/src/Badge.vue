<script setup lang="ts">
import { usenamespace } from '@zl-gp/hooks'
import type { BadgeProps } from './types'
import { onMounted, ref } from 'vue'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import { offset } from '@popperjs/core/lib/popper'

defineOptions({
  name: 'ZlBadge'
})
const { text, size = 15, position = 'top-end' } = defineProps<BadgeProps>()

const style = {
  width: size + 'px',
  height: size + 'px',
  'font-size': size + 'px',
  'line-height': size + 'px'
}

const { namespace } = usenamespace('badge')
const _ref = ref<HTMLSpanElement>()

onMounted(() => {
  const parentEl = _ref.value?.parentElement
  if (_ref.value && parentEl && position !== 'line-end') {
    createPopper(parentEl, _ref.value, {
      placement: position,
      modifiers: [
        offset,
        {
          name: 'offset',
          options: {
            offset: [
              position.includes('end') ? size / 2 : -size / 2,
              position.includes('end') ? -size / 2 : -size / 2
            ]
          }
        }
      ]
    })
  }
})

defineExpose({
  ref: _ref
})
</script>
<template>
  <span ref="_ref" :class="[namespace.className, type]" :style="style">{{ text }}</span>
</template>
<style lang="css">
@import url(Badge.scss);
</style>

<script lang="ts" setup>
import { usenamespace, useObserver } from '@zl-gp/hooks'
import { MenuSubInjectKey } from './MenuSub'
import { inject, onMounted, provide, reactive, ref } from 'vue'
import { MenuInjectKey } from './Menu'
import type { MenuSubProp } from './types'

defineOptions({
  name: 'ZlMenuSub'
})

const { prop } = defineProps<MenuSubProp>()

const menuInjectKey = inject(MenuInjectKey, null)

const _ref = ref<HTMLDivElement | null>(null)
const offsetWidth = ref(_ref.value?.offsetWidth)

onMounted(() => {
  if (_ref.value) {
    useObserver(_ref, offsetWidth)
  }
})

provide(MenuSubInjectKey, reactive({ prop }))

const { namespace } = usenamespace('menu')
const leave = () => {
  menuInjectKey?.unSubSelect()
}

const sel = () => {
  menuInjectKey?.subSelect(prop)
}
</script>
<template>
  <div ref="_ref" :class="namespace.cs('sub')">
    <div @click="sel">{{ name }}</div>
    <div
      :class="[{ 'sub-menu': menuInjectKey && menuInjectKey.flex == 'row' }]"
      @mouseleave="leave"
      :style="[{ width: offsetWidth + 'px' }]"
    >
      <slot></slot>
    </div>
  </div>
</template>

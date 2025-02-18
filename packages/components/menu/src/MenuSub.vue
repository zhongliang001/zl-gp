<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { MenuSubInjectKey, type MenuSubProp } from './MenuSub'
import { inject, provide, reactive } from 'vue'
import { MenuInjectKey } from './Menu'

defineOptions({
  name: 'ZlMenuSub'
})

const { prop } = defineProps<MenuSubProp>()

const menuInjectKey = inject(MenuInjectKey, null)

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
  <div :class="namespace.cs('sub')" @click="sel">
    {{ name }}
    <div
      :class="[{ 'sub-menu': menuInjectKey && menuInjectKey.flex == 'row' }]"
      @mouseleave="leave"
    >
      <slot></slot>
    </div>
  </div>
</template>

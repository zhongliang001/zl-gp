<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { MenuInjectKey, type MenuItemProp } from './Menu'
import { inject } from 'vue'
defineOptions({
  name: 'ZlMenuItem'
})
const { namespace } = usenamespace('menu')

const menuInjectKey = inject(MenuInjectKey)

const props = defineProps<MenuItemProp>()

const handlerClick = () => {
  menuInjectKey?.select(props.prop)
}
</script>
<template>
  <div
    :class="[
      namespace.cs('item'),
      { selected: menuInjectKey && menuInjectKey?.selected == props.prop }
    ]"
    :prop="props.prop"
    @click="handlerClick"
  >
    <slot></slot>
  </div>
</template>
<style lang="css">
@import url('./Menu.scss');
</style>

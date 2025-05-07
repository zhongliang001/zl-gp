<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { MenuInjectKey } from './Menu'
import type { MenuItemProp } from './MenuItem'
import { MenuSubInjectKey } from './MenuSub'

import { inject } from 'vue'
import { omit } from 'lodash-es'
defineOptions({
  name: 'ZlMenuItem'
})
const { namespace } = usenamespace('menu')

const menuInjectKey = inject(MenuInjectKey, null)

const menuSubInjectKey = inject(MenuSubInjectKey, null)

const props = defineProps<MenuItemProp>()

const _props = omit(props, ['prop'])

const handlerClick = () => {
  menuInjectKey?.select(props.prop)
  menuInjectKey?.unSubSelect()
}
</script>
<template>
  <div
    :class="[
      namespace.cs('item'),
      { selected: menuInjectKey && menuInjectKey?.selected == props.prop },
      {
        hidden:
          menuSubInjectKey && menuInjectKey && menuSubInjectKey.prop != menuInjectKey?.subSelected
      }
    ]"
    :prop="props.prop"
    @click="handlerClick"
  >
    <RouterLink v-bind="_props"><slot></slot></RouterLink>
  </div>
</template>
<style lang="css">
@import url('./Menu.scss');
</style>

<script lang="ts" setup>
import { provide, reactive, ref, type Ref } from 'vue'
import { MenuInjectKey, useMenu } from './Menu'
import { usenamespace } from '@zl-gp/hooks'
import type { MenuProps } from './types'
defineOptions({
  name: 'ZlMenu'
})

const props = withDefaults(defineProps<MenuProps>(), {
  is: 'nav',
  flex: 'row'
})
const { namespace } = usenamespace('menu')
const selected: Ref<string> = ref<string>('')

const select = (ele: string) => {
  selected.value = ele
}

const subSelected: Ref<string> = ref<string>('')

const subSelect = (ele: string) => {
  subSelected.value = ele
}

const unSubSelect = () => {
  subSelected.value = ''
}

const { _props } = useMenu(props)

provide(
  MenuInjectKey,
  reactive({ selected, select, subSelected, subSelect, unSubSelect, flex: props.flex })
)
</script>
<template>
  <component :class="namespace.className" v-bind="_props" :is="is">
    <slot></slot>
  </component>
</template>
<style lang="css">
@import url('./Menu.scss');
</style>

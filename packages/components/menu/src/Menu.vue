<script lang="ts" setup>
import { provide, reactive, ref, type Ref } from 'vue'
import { type MenuProps, MenuInjectKey } from './Menu'
import { usenamespace } from '@zl-gp/hooks'
defineOptions({
  name: 'ZlMenu'
})

const { is = 'nav' } = defineProps<MenuProps>()
const { namespace } = usenamespace('menu')
const selected: Ref<string> = ref<string>('')

const select = (ele: string) => {
  selected.value = ele
}

provide(MenuInjectKey, reactive({ selected, select }))
</script>
<template>
  <component :class="namespace.className" :is="is">
    <slot></slot>
  </component>
</template>
<style lang="css">
@import url('./Menu.scss');
</style>

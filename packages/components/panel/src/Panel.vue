<script setup lang="ts">
import { ref } from 'vue'
import type { PanelProps } from './types'
import { usenamespace } from '@zl-gp/hooks'
import ZlIcon from '../../icon'

defineOptions({
  name: 'ZlPanel'
})
const { isFolder = false } = defineProps<PanelProps>()
const { namespace } = usenamespace('panel')

const _ref = ref<HTMLDivElement>()

const arrowDirect = ref('arrow-down')

const foldState = ref(false)
const fold = () => {
  if (isFolder) {
    foldState.value = !foldState.value
    arrowDirect.value = 'arrow-right'
  } else {
    arrowDirect.value = 'arrow-down'
  }
}
defineExpose({
  ref: _ref
})
</script>
<template>
  <div :class="namespace.className" ref="_ref">
    <div class="title" @click="fold">
      <span>{{ title }}</span>
      <ZlIcon :name="arrowDirect" v-if="isFolder"></ZlIcon>
    </div>
    <transition name="panel-fade">
      <div class="main" v-if="!foldState">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<style lang="css">
@import url(Panel.scss);
</style>

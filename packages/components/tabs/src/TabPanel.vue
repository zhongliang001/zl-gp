<script setup lang="ts">
import { inject, ref } from 'vue'
import type { TabPanelProps } from './types'
import { TabsInjectkey } from '../../tabs'
import { usenamespace } from '@zl-gp/hooks'
import { useTabPanel } from './TabPanel'

defineOptions({
  name: 'ZlTabPanel'
})
const { name, forTab = false } = defineProps<TabPanelProps>()
const { namespace } = usenamespace('panel')

const tb = inject(TabsInjectkey)

const _ref = ref<HTMLDivElement>()

const { selName } = useTabPanel(tb, name)

defineExpose({
  ref: _ref
})
</script>
<template>
  <div :class="namespace.className" ref="_ref" v-if="selName.name === name || !forTab">
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="css">
@import url(TabPanel.scss);
</style>

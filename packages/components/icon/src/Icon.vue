<script lang="ts" setup>
import { computed, type Ref } from 'vue'
import type { InconInfo, IconJsonType, IconProps } from './icon'
import iconjson from './icon.json'
defineOptions({
  name: 'ZlIcon'
})
const props = withDefaults(defineProps<IconProps>(), {
  width: 16,
  height: 16
})

const ic: Ref<InconInfo> = computed(() => {
  const ij: IconJsonType = iconjson
  const iconInfo = ij[props.name]
  if (iconInfo) {
    if (props.color) {
      iconInfo.color = props.color
    }
    return iconInfo
  } else {
    return {
      d: '',
      color: ''
    }
  }
})
</script>
<template>
  <svg class="icon" viewBox="0 0 1024 1024" :width="width" :height="height">
    <path :d="ic.d" :fill="ic.color"></path>
  </svg>
</template>

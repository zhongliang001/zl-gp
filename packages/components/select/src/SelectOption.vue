<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { SelectInjectKey } from './Select'
import type { SelectOptionProps } from './types'

defineOptions({
  name: 'ZlSelectOption'
})
const { name, value } = defineProps<SelectOptionProps>()
const selectContext = inject(SelectInjectKey)

onMounted(() => {
  const addOption = selectContext?.addOption
  if (addOption) {
    addOption({
      name: name,
      value: value,
      info: name,
      filter: false
    })
  }
})
</script>
<template>
  <div></div>
</template>

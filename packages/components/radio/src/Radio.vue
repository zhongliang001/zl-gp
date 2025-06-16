<script setup lang="ts">
import { usenamespace } from '@zl-gp/hooks'
import type { RadioProps } from './types'
import ZlIcon from '../../icon'
import { useRadio } from './Radio'
import { ref } from 'vue'

defineOptions({
  name: 'ZlRadio'
})

const props = defineProps<RadioProps>()
const { namespace } = usenamespace('radio')
const emit = defineEmits(['update:modelValue'])
const inputRef = ref<HTMLInputElement>()
const { checked, click, color } = useRadio(props, inputRef, emit)
</script>
<template>
  <div :class="[namespace.className, { checked: checked }]">
    <input ref="inputRef" type="radio" :name="name" @click="click" :value="value" />
    <ZlIcon name="select-bold" :color="color"></ZlIcon>
    <span><slot></slot></span>
  </div>
</template>
<style lang="css">
@import url(Radio.scss);
</style>

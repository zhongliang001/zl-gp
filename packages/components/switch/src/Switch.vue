<script setup lang="ts">
import { ref } from 'vue'
import type { SwitchProps } from './types'
import useSwitch from './Switch'

const emit = defineEmits(['update:modelValue'])
defineOptions({
  name: 'ZlSwitch'
})

const input = ref<HTMLInputElement>()
const props = defineProps<SwitchProps>()
const isRight = ref(props.modelValue)

const { click } = useSwitch(props, isRight, emit, input)
</script>
<template>
  <div class="switch" @click="click()">
    <input ref="input" name="name" type="checkbox" @click.prevent />
    <div class="circle" :class="{ right: isRight }"></div>
  </div>
</template>
<style lang="css">
@import url(Switch.scss);
</style>

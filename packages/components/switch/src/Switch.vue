<script setup lang="ts">
import { ref } from 'vue'
import type { SwitchProps } from './types'
import useSwitch from './Switch'
import { usenamespace } from '@zl-gp/hooks'

const emit = defineEmits(['update:modelValue'])
defineOptions({
  name: 'ZlSwitch'
})

const { namespace } = usenamespace('switch')

const input = ref<HTMLInputElement>()
const props = withDefaults(defineProps<SwitchProps>(), {
  outside: true
})
const isRight = ref(props.modelValue)

const { click } = useSwitch(props, isRight, emit, input)
</script>
<template>
  <div :class="[namespace.className, namespace.size(size), { checked: isRight }]" @click="click()">
    <span v-if="outside">{{ activeText }}</span>
    <span class="switch" :class="[{ relative: outside }]">
      <div class="text" v-if="!outside && isRight">
        <span class="left">{{ activeText }}</span>
      </div>

      <input ref="input" name="name" type="checkbox" @click.prevent />
      <div class="circle" :class="{ right: isRight }"></div>
      <div class="text" v-if="!outside && !isRight">
        <span>{{ inActiveText }}</span>
      </div>
    </span>
    <span v-if="outside">{{ inActiveText }}</span>
  </div>
</template>
<style lang="css">
@import url(Switch.scss);
</style>

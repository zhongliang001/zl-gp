<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { type ButtonProps, type ButtonEmits, buttonEmits, useButton } from './Button'
import { type SetupContext } from 'vue'

defineOptions({
  name: 'ZlButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
  type: 'primary'
})
const { namespace } = usenamespace('button')
const emit: SetupContext<ButtonEmits>['emit'] = defineEmits(buttonEmits)
const { eventHandler, _props, _ref } = useButton(emit, props)

defineExpose({
  ref: _ref
})
</script>
<template>
  <button
    ref="_ref"
    :class="[namespace.bs(type)]"
    :name="name"
    v-bind="_props"
    @click="eventHandler"
  >
    <slot></slot>
  </button>
</template>
<style lang="css">
@import url('./Button.scss');
</style>

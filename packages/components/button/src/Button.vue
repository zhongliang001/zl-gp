<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { useButton } from './Button'
import { type SetupContext } from 'vue'
import { buttonEmits, type ButtonEmits, type ButtonProps } from './types'

defineOptions({
  name: 'ZlButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
  type: 'primary',
  size: 'normal'
})
const { namespace } = usenamespace('button')
const emit: SetupContext<ButtonEmits>['emit'] = defineEmits(buttonEmits)
const { eventHandler, _props, _ref } = useButton(emit, props)

defineExpose({
  ref: _ref,
  eventHandler: eventHandler
})
</script>
<template>
  <button
    ref="_ref"
    :class="[namespace.bs(type), namespace.size(size)]"
    :name="name"
    v-bind="_props"
    @click="eventHandler">
    <slot></slot>
  </button>
</template>
<style lang="css">
@import url('./Button.scss');
</style>

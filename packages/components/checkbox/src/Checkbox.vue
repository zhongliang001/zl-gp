<script setup lang="ts">
import { usenamespace } from '@zl-gp/hooks'
import type { CheckboxProps } from './types'
import { ref } from 'vue'
import { useCheckbox } from './CheckBox'
import ZlIcon from '../../icon'

defineOptions({
  name: 'ZlCheckbox'
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  skin: 'normal'
})

const emit = defineEmits(['update:modelValue', 'change'])

const { namespace } = usenamespace('checkbox')

const _ref = ref<HTMLDivElement>()

const inputRef = ref<HTMLInputElement>()

const { changecheckState, checkState, click, color, indeterminate, select, selected, unselect } =
  useCheckbox(inputRef, props, emit)

defineExpose({
  ref: _ref,
  changecheckState,
  click,
  indeterminate,
  select,
  selected,
  unselect
})
</script>
<template>
  <div :class="namespace.className" ref="_ref" @click="click($event)">
    <input
      ref="inputRef"
      type="checkbox"
      :name="name"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      :title="name" />
    <template v-if="skin === 'normal'">
      <ZlIcon
        :name="checkState"
        :width="20"
        :height="20"
        :color="disabled || readonly ? 'rgb(209, 209, 209)' : '#515151'"></ZlIcon>
      <label>{{ label }}</label>
    </template>

    <div
      class="tag"
      v-if="skin === 'tag' || skin === 'customize'"
      :class="[{ selected: selected }, { disbaled: disabled || readonly }]">
      <div class="label">
        <template v-if="skin === 'customize'"><slot></slot></template>
        <template v-else>{{ label }}</template>
      </div>
      <div class="ic" v-if="skin === 'tag'">
        <ZlIcon name="select-bold" :color="color"></ZlIcon>
      </div>
    </div>
  </div>
</template>
<style lang="css">
@import url(Checkbox.scss);
</style>

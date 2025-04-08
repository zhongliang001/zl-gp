<script lang="ts" setup>
import { useInputMethod, usenamespace } from '@zl-gp/hooks'
import { SelectInjectKey, useSelect, type SelectProps } from './Select'
import { onMounted, provide, reactive, ref, watch } from 'vue'

defineOptions({
  name: 'ZlSelect'
})

const props = withDefaults(defineProps<SelectProps>(), {
  filter: true
})

const { namespace } = usenamespace('select')
const emit = defineEmits(['update:modelValue'])
const _ref = ref<HTMLDivElement | null>(null)
const selInput = ref<HTMLInputElement | null>(null)

const {
  _props,
  addOption,
  handlerMouseleave,
  handlerClick,
  handlerEnd,
  hidden,
  init,
  iconName,
  options,
  sel,
  update
} = useSelect(props, emit, _ref, selInput)

const { compositionStart, compositionEnd, handlerInput } = useInputMethod()

onMounted(() => {
  init()
})

watch(
  () => props.modelValue,
  (newVal) => {
    update(newVal)
  }
)

provide(
  SelectInjectKey,
  reactive({
    addOption
  })
)

defineExpose({
  _ref
})
</script>
<template>
  <div ref="_ref" :class="namespace.className">
    <div class="zl-select-sel">
      <input
        class="input"
        ref="selInput"
        :name="name"
        type="text"
        v-bind="_props"
        @click="handlerClick"
        @compositionstart="compositionStart"
        @compositionend="compositionEnd($event, handlerEnd)"
        @input="handlerInput($event, handlerEnd)"
      />
      <zl-icon class="icon" :class="[{ hidden: disabled }]" :name="iconName"></zl-icon>
    </div>
    <div :class="[namespace.cs('options'), { hidden: hidden }]" @mouseleave="handlerMouseleave">
      <div
        class="option"
        :class="[{ hidden: item.filter }]"
        v-for="(item, index) in options"
        :key="index"
        @click="sel(item)"
        v-html="item.info"
      ></div>
    </div>
  </div>
  <slot></slot>
</template>
<style lang="css">
@import url('./Select.scss');
</style>

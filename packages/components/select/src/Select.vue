<script lang="ts" setup>
import { useInputMethod, usenamespace, useObserver } from '@zl-gp/hooks'
import { SelectInjectKey, useSelect } from './Select'
import { onMounted, provide, reactive, ref, watch } from 'vue'
import { ZlIcon } from '@zl-gp/components/icon'
import type { SelectProps } from './types'

defineOptions({
  name: 'ZlSelect'
})

const props = withDefaults(defineProps<SelectProps>(), {
  filter: true,
  options: () => []
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
  sel,
  update
} = useSelect(props, emit, _ref, selInput)

const { compositionStart, compositionEnd, handlerInput } = useInputMethod()

const offsetWidth = ref(_ref.value?.offsetWidth)

onMounted(() => {
  init()
  if (_ref.value) {
    useObserver(_ref, offsetWidth)
  }
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
        autocomplete="off"
        v-bind="_props"
        @click="handlerClick"
        @compositionstart="compositionStart"
        @compositionend="compositionEnd($event, handlerEnd)"
        @input="handlerInput($event, handlerEnd)" />
      <ZlIcon class="icon" :class="[{ hidden: disabled }]" :name="iconName"></ZlIcon>
    </div>
    <div :class="[namespace.cs('options'), { hidden: hidden }]">
      <ul @mouseleave="handlerMouseleave" :style="[{ width: offsetWidth + 'px' }]">
        <li
          class="option"
          :class="[{ hidden: item.filter }]"
          v-for="(item, index) in options"
          :key="index"
          @click="sel(item)"
          v-html="item.info ? item.info : (item.info = item.name)"></li>
      </ul>
    </div>
  </div>
  <slot></slot>
</template>
<style lang="css">
@import url('./Select.scss');
</style>

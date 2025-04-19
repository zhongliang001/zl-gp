<script lang="ts" setup>
import { useInputMethod, usenamespace } from '@zl-gp/hooks'
import { SelectInjectKey, useSelect, type SelectProps } from './Select'
import { onMounted, provide, reactive, ref, watch } from 'vue'
import { ZlIcon } from '@zl-gp/components/icon'

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

const hh = ref(_ref.value?.offsetWidth)

onMounted(() => {
  init()
  if (_ref.value) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === _ref.value) {
          hh.value = entry.contentRect.width
        }
      }
    })
    resizeObserver.observe(_ref.value)
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
        @input="handlerInput($event, handlerEnd)"
      />
      <ZlIcon class="icon" :class="[{ hidden: disabled }]" :name="iconName"></ZlIcon>
    </div>
    <div :class="[namespace.cs('options'), { hidden: hidden }]">
      <ul @mouseleave="handlerMouseleave" :style="[{ width: hh + 'px' }]">
        <li
          class="option"
          :class="[{ hidden: item.filter }]"
          v-for="(item, index) in options"
          :key="index"
          @click="sel(item)"
          v-html="item.info"
        ></li>
      </ul>
    </div>
  </div>
  <slot></slot>
</template>
<style lang="css">
@import url('./Select.scss');
</style>

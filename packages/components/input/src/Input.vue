<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { useInput } from './Input'
import { inject, onMounted, ref } from 'vue'
import { FormItemInjectKey } from '@zl-gp/components/form/src/FormItem'
import { ZlIcon } from '@zl-gp/components'
import type { InputProps } from './types'
defineOptions({
  name: 'ZlInput'
})
const props = withDefaults(defineProps<InputProps>(), {
  width: 100,
  height: 30
})

const { namespace } = usenamespace('input')
const emit = defineEmits(['update:modelValue'])

const formItemInject = inject(FormItemInjectKey, undefined)
const _ref = ref<HTMLInputElement | null>(null)

const setMessage = formItemInject?.setMessage

const { _props, autocomplete, handlerBlur, click, handlerFocus, reset, handlerInput, error } =
  useInput(props, emit, _ref, setMessage)

onMounted(() => {
  const input: HTMLInputElement | null = _ref.value
  if (input) {
    input.value = props.modelValue as string
  }
  if (props) {
    emit('update:modelValue', props.modelValue)
  }
  formItemInject?.addFiled({ reset: reset, valid: props.valid })
})

defineExpose({
  ref: _ref
})
</script>
<template>
  <div :class="[namespace.className, { error: error }]">
    <input
      ref="_ref"
      v-bind="_props"
      :autocomplete="autocomplete"
      @input="handlerInput"
      @blur="handlerBlur"
      @focus="handlerFocus"
      @click="click"
    />
    <ZlIcon v-if="clearable" name="close" :width="10" @click="reset" />
  </div>
</template>
<style lang="css">
@import url(input.scss);
</style>

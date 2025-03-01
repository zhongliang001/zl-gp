<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { useInput, type InputProps } from './Input'
import { inject, onMounted, ref } from 'vue'
import { FormItemInjectKey } from '@zl-gp/components/form/src/FormItem'
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

const { _props, blur, focus, reset, handlerInput, error } = useInput(props, emit, _ref, setMessage)

onMounted(() => {
  const input: HTMLInputElement | null = _ref.value
  if (input) {
    input.value = props.modelValue as string
  }
  if (props) {
    emit('update:modelValue', props.modelValue)
  }
  formItemInject?.addFiled({ reset: reset })
})

defineExpose({
  ref: _ref
})
</script>
<template>
  <input
    ref="_ref"
    :class="[namespace.className, { error: error }]"
    v-bind="_props"
    @input="handlerInput"
    @blur="blur"
    @focus="focus"
  />
</template>
<style lang="css">
@import url(input.scss);
</style>

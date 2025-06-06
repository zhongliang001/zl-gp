<script lang="ts" setup>
import { onMounted, provide, reactive } from 'vue'
import { FormInjectkey, useForm } from './Form'
import { usenamespace } from '@zl-gp/hooks'
import type { FormProps } from './types'

defineOptions({
  name: 'ZlForm'
})
const props = defineProps<FormProps>()

const { namespace } = usenamespace('form')

const { addItem, formItems, reset, _ref, validate } = useForm(props)

onMounted(() => {
  console.log(formItems)
})

provide(
  FormInjectkey,
  reactive({
    addItem,
    ref: _ref,
    reset,
    validate
  })
)

defineExpose({
  ref: _ref,
  validate,
  reset,
  formItems
})
</script>
<template>
  <form
    ref="_ref"
    :class="namespace.className"
    :name="name"
    :action="url"
    :method="method"
    :enctype="enctype"
    :novalidate="novalidate"
    :target="target"
  >
    <slot></slot>
  </form>
</template>
<style lang="css">
@import url('./Form.scss');
</style>

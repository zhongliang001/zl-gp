<script lang="ts" setup>
import { onMounted, provide, reactive } from 'vue'
import { FormInjectkey, useForm, type FormProps } from './Form'
import { usenamespace } from '@zl-gp/hooks'

defineOptions({
  name: 'ZlForm'
})
const props = defineProps<FormProps>()

const { namespace } = usenamespace('form')

const { addItem, formItems, reset, _ref, volidate } = useForm(props)

onMounted(() => {
  console.log(formItems)
})

provide(
  FormInjectkey,
  reactive({
    addItem,
    ref: _ref,
    reset,
    volidate
  })
)

defineExpose({
  ref: _ref,
  volidate,
  reset
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

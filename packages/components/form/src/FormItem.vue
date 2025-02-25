<script lang="ts" setup>
import { inject, provide, reactive, ref } from 'vue'
import { FormInjectkey } from './Form'
import { FormItemInjectKey, useFormItem, type FormItemProps } from './FormItem'
import { usenamespace } from '@zl-gp/hooks'
defineOptions({
  name: 'ZlFormItem'
})

const { prop } = defineProps<FormItemProps>()
const { namespace } = usenamespace('form')

const formInjectkey = inject(FormInjectkey)
// const addItem = formInjectkey?.addItem

const _ref = ref<HTMLDivElement>()
const { addFiled, message, setMessage } = useFormItem(prop, formInjectkey)

provide(
  FormItemInjectKey,
  reactive({
    addFiled,
    setMessage
  })
)

defineExpose({
  ref: _ref
})
</script>
<template>
  <div :class="namespace.cs('item')" ref="_ref">
    <div class="field">
      <label :class="namespace.cs('item-lable')">{{ label }}</label>
      <div :class="namespace.cs('item-field')">
        <slot></slot>
        <p :class="[{ error: message }]">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

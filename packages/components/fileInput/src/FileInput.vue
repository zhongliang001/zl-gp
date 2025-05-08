<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { useFileInput, type FileInputProps } from './FileInput'

import { inject, onMounted, ref } from 'vue'
import { FormItemInjectKey } from '@zl-gp/components/form/src/FormItem'

defineOptions({
  name: 'ZlFileInput'
})

defineProps<FileInputProps>()

const formItemInject = inject(FormItemInjectKey, undefined)

const defMsg = '点击选择需要上传的文件'
const msg = ref(defMsg)
const _ref = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['update:modelValue'])
const { namespace } = usenamespace('file-input')

const { inputHandler, reset } = useFileInput(_ref, msg, emit)

onMounted(() => {
  formItemInject?.addFiled({ reset: reset })
})
</script>
<template>
  <div :class="namespace.className">
    <input ref="_ref" type="file" :name="name" @input="inputHandler" />
    <div>{{ msg }}</div>
  </div>
</template>
<style lang="css">
@import url(./FileInput.scss);
</style>

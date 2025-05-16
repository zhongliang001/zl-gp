<script lang="ts" setup>
import { usenamespace } from '@zl-gp/hooks'
import { useFileInput, type FileInputProps } from './FileInput'
import { onMounted, ref } from 'vue'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import offset from '@popperjs/core/lib/modifiers/offset'
import { ZlIcon } from '../../icon'

defineOptions({
  name: 'ZlFileInput'
})
const props = withDefaults(defineProps<FileInputProps>(), {
  type: 'primary'
})
const msg = '点击选择需要上传的文件'
const _ref = ref<HTMLDivElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const fileList = ref<HTMLDivElement | null>(null)

const { namespace } = usenamespace('file-input')

const { _prop, deleteFile, files, inputHandler } = useFileInput(props, input)

onMounted(() => {
  createPopper(_ref.value!, fileList.value!, {
    placement: 'bottom-start',
    modifiers: [
      offset,
      {
        name: 'offset',
        options: {
          offset: [0, 1]
        }
      }
    ]
  })
})

defineExpose({
  files
})
</script>
<template>
  <div ref="_ref" :class="namespace.bs(type)">
    <input ref="input" type="file" @input="inputHandler" v-bind="_prop" />
    <div>{{ msg }}</div>
    <ul ref="fileList">
      <li v-for="item in files" :title="item.name" :key="item.name">
        <span>{{ item.name }}</span>
        <ZlIcon name="close" @click="deleteFile(item)"></ZlIcon>
      </li>
    </ul>
  </div>
</template>
<style lang="css">
@import url(./FileInput.scss);
</style>

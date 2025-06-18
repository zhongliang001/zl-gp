<script setup lang="ts">
import { useInputMethod, usenamespace } from '@zl-gp/hooks'
import type { TransferBoxProps } from './types'
import {} from 'vue'
import { useTransferBox } from './TransferBox'
const { filter, options } = defineProps<TransferBoxProps>()

const { compositionStart, compositionEnd, handlerInput } = useInputMethod()

const { value, selIdx, handlerEnd, toSelect, reset } = useTransferBox(filter, options)

const { namespace } = usenamespace('transfer-box')

defineOptions({
  name: 'ZlTransferBox'
})

defineExpose({
  selIdx,
  reset
})
</script>

<template>
  <div :class="namespace.className">
    <div class="title">
      <strong>{{ title }}</strong>
    </div>
    <div class="search">
      <input
        name="search"
        placeholder="关键词搜索"
        v-if="filter"
        @compositionstart="compositionStart"
        @compositionend="compositionEnd($event, handlerEnd)"
        @input="handlerInput($event, handlerEnd)" />
    </div>
    <div class="list" :style="[{ height: 250 - 25 - (filter ? 25 : 0) - 4 + 'px' }]">
      <ul>
        <template v-for="(option, index) in options" :key="index">
          <li
            v-if="
              (direction === 'left' &&
                selValue.indexOf(option.value) === -1 &&
                (!filter || !value || option.name.indexOf(value) !== -1)) ||
              (direction === 'right' &&
                selValue.indexOf(option.value) !== -1 &&
                (!filter || !value || option.name.indexOf(value) !== -1))
            "
            @click="toSelect(index)"
            :class="[{ sel: selIdx === index }, { disabled: option.disabled }]">
            <span>{{ option.name }}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

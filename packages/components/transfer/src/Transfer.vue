<script setup lang="ts">
import { usenamespace } from '@zl-gp/hooks'
import type { TransferProps } from './types'
import { useTransfer } from './Transfer'
import ZlButton from '../../button'
import ZlIcon from '../../icon'
import { ZlTransferBox } from '..'
import type { TransferBoxInstance } from './instances'
import { ref } from 'vue'

defineOptions({
  name: 'ZlTransfer'
})

const { options, ltitle = 'left', rtitle = 'right' } = defineProps<TransferProps>()

const { namespace } = usenamespace('transfer')

const emit = defineEmits(['update:modelValue'])
const leftBox = ref<TransferBoxInstance>()
const rightBox = ref<TransferBoxInstance>()

const { select, selectAll, selValue, unSelect, unSelectAll } = useTransfer(
  options,
  leftBox,
  rightBox,
  emit
)
</script>
<template>
  <div :class="namespace.className">
    <ZlTransferBox
      ref="leftBox"
      :options="options"
      :title="ltitle"
      :selValue="selValue"
      :filter="filter"
      direction="left"></ZlTransferBox>
    <div class="btns">
      <ZlButton native-type="button" type="light" @click="selectAll">
        <ZlIcon name="arrow-double-right" :width="10" :height="10"></ZlIcon>
      </ZlButton>
      <ZlButton native-type="button" type="light" @click="select">
        <ZlIcon name="arrow-right" :width="10" :height="10"></ZlIcon>
      </ZlButton>
      <ZlButton native-type="button" type="light" @click="unSelect">
        <ZlIcon name="arrow-left" :width="10" :height="10"></ZlIcon>
      </ZlButton>
      <ZlButton native-type="button" type="light" @click="unSelectAll">
        <ZlIcon name="arrow-double-left" :width="10" :height="10"></ZlIcon>
      </ZlButton>
    </div>
    <ZlTransferBox
      ref="rightBox"
      :options="options"
      :title="rtitle"
      :selValue="selValue"
      :filter="filter"
      direction="right"></ZlTransferBox>
  </div>
</template>
<style lang="css">
@import url(Transfer.scss);
</style>

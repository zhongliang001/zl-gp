<script lang="ts" setup>
import { usenamespace, useObserver } from '@zl-gp/hooks'
import { useDatePicker } from './DatePicker'
import dayjs from 'dayjs'
import { inject, onMounted, ref } from 'vue'
import { ZlIcon } from '@zl-gp/components/icon'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import offset from '@popperjs/core/lib/modifiers/offset'
import { OnClickOutside } from '@vueuse/components'
import type { DatePickerProps } from './types'
import { FormItemInjectKey } from '../../form/src/FormItem'
import ZlButton from '../../button'

defineOptions({
  name: 'ZlDatePicker'
})
const emit = defineEmits(['update:modelValue'])
const {
  weekStart = 'sunday',
  editable = false,
  disabled = false,
  format = 'YYYY-MM-DD',
  required = false
} = defineProps<DatePickerProps>()
const formItemInject = inject(FormItemInjectKey, undefined)
const setMessage = formItemInject?.setMessage
const { namespace } = usenamespace('date-picker')
const _ref = ref<HTMLDivElement | null>(null)
const picker = ref<HTMLDivElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const offsetWidth = ref(_ref.value?.offsetWidth)
const show = ref<string>('')
onMounted(() => {
  createPopper(_ref.value!, picker.value!, {
    placement: 'bottom-start',
    modifiers: [
      offset,
      {
        name: 'offset',
        options: {
          offset: [0, 0]
        }
      }
    ]
  })
  if (_ref.value) {
    useObserver(_ref, offsetWidth)
  }
  formItemInject?.addFiled({ reset: reset, valid: valid, setValidResult: setValidResult })
})

const hiddenDaySel = () => {
  show.value = ''
}

const month = ref(dayjs().month() + 1)
const year = ref(dayjs().year())
const day = ref(dayjs().date())
const {
  addMonth,
  addYear,
  dateTableCache,
  getMonth,
  getYear,
  monthTableCache,
  subYear,
  subMonth,
  chooseDate,
  chooseMonth,
  chooseYear,
  yearTableCache,
  addYearPage,
  reset,
  subYearPage,
  setValidResult,
  valid,
  error,
  validFlag
} = useDatePicker(
  day,
  year,
  month,
  weekStart,
  format,
  emit,
  disabled,
  input,
  show,
  required,
  setMessage
)

defineExpose({
  getMonth,
  getYear
})
</script>
<template>
  <OnClickOutside @trigger="hiddenDaySel">
    <div ref="_ref" :class="[namespace.className, { error: error, valid: validFlag }]">
      <div>
        <div class="date-input">
          <input ref="input" type="text" :name="name" @click="chooseDate()" :readonly="!editable" />
          <ZlIcon v-if="validFlag && !error" name="success" color="green"></ZlIcon>
          <ZlIcon v-if="validFlag && error" name="fail" color="red"></ZlIcon>
          <ZlIcon class="close" v-if="clearable" name="close" :width="10" @click="reset" />
        </div>
        <div ref="picker" class="picker" :style="[{ width: offsetWidth + 'px' }]">
          <div class="datepicker" v-show="show === 'date'">
            <div>
              <ZlIcon name="arrow-double-left" :width="10" :height="10" @click="subYear" />
              <ZlIcon name="arrow-left" :width="10" :height="10" @click="subMonth" />
              <ZlButton
                native-type="button"
                type="primary"
                class="year-btn"
                size="mini"
                @click="chooseYear()">
                {{ year }}
              </ZlButton>
              <ZlButton
                native-type="button"
                type="primary"
                class="month-btn"
                size="mini"
                @click="chooseMonth()">
                {{ month }}
              </ZlButton>
              <ZlIcon name="arrow-right" :width="10" :height="10" @click="addMonth" />
              <ZlIcon name="arrow-double-right" :width="10" :height="10" @click="addYear" />
            </div>
            <div>
              <component :is="dateTableCache"></component>
            </div>
          </div>
          <div class="monthpicker" v-show="show === 'month'">
            <component :is="monthTableCache"></component>
          </div>
          <div class="yearpicker" v-show="show === 'year'">
            <div>
              <ZlIcon name="arrow-left" :width="10" :height="10" @click="subYearPage" />
              {{ year }}
              <ZlIcon name="arrow-right" :width="10" :height="10" @click="addYearPage" />
            </div>
            <div>
              <component :is="yearTableCache"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </OnClickOutside>
</template>
<style lang="css">
@import url(./DatePicker.scss);
</style>

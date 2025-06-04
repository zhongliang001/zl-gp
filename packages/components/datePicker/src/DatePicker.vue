<script lang="ts" setup>
import { usenamespace, useObserver } from '@zl-gp/hooks'
import { useDatePicker } from './DatePicker'
import dayjs from 'dayjs'
import { onMounted, reactive, ref } from 'vue'
import { ZlIcon } from '@zl-gp/components/icon'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import offset from '@popperjs/core/lib/modifiers/offset'
import { OnClickOutside } from '@vueuse/components'
import type { DatePickerInstance, DatePickerProps } from './type'

defineOptions({
  name: 'ZlDatePicker'
})
const emit = defineEmits(['update:modelValue'])
const {
  weekStart = 'sunday',
  editable = false,
  disabled = false,
  format = 'YYYY-MM-DD'
} = defineProps<DatePickerProps>()
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
          offset: [0, 1]
        }
      }
    ]
  })
  if (_ref.value) {
    useObserver(_ref, offsetWidth)
  }
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
  subYearPage
} = useDatePicker(day, year, month, weekStart, format, emit, disabled, input, show)

defineExpose(
  reactive<DatePickerInstance>({
    getMonth: getMonth,
    getYear: getYear
  })
)
</script>
<template>
  <OnClickOutside @trigger="hiddenDaySel">
    <div ref="_ref" :class="namespace.className">
      <div>
        <div>
          <input
            ref="input"
            type="text"
            :name="name"
            @click="chooseDate($event)"
            :readonly="!editable"
          />
        </div>
        <div ref="picker" class="picker" :style="[{ width: offsetWidth + 'px' }]">
          <div class="datepicker" v-show="show === 'date'">
            <div>
              <ZlIcon name="arrow-double-left" :width="10" :height="10" @click="subYear" />
              <ZlIcon name="arrow-left" :width="10" :height="10" @click="subMonth" />
              <button type="button" class="year-btn" @click="chooseYear($event)">{{ year }}</button>
              <button type="button" class="month-btn" @click="chooseMonth($event)">
                {{ month }}
              </button>
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

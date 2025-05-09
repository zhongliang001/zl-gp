import type { InputEmits } from '@zl-gp/core'
import dayjs from 'dayjs'
import { h, ref, type Ref, type SetupContext, type VNode } from 'vue'

export type Date = {
  year: number
  month: number
  day: number
  dStr: string
}

export interface DatePickerProps {
  editable?: boolean
  format?: string
  disabled?: boolean
  modelValue?: string
  name?: string
  showTime?: boolean
  weekStart?: 'monday' | 'sunday'
}

export const useDatePicker = (
  year: Ref<number>,
  month: Ref<number>,
  weekStart: 'monday' | 'sunday',
  format: string,
  emit: SetupContext<InputEmits>['emit'],
  disabled: boolean,
  input: Ref<HTMLInputElement | null>,
  show: Ref<string>
) => {
  const addYear = () => {
    year.value++
  }

  const addMonth = () => {
    if (month.value == 12) {
      month.value = 1
      year.value++
    } else {
      month.value++
    }
  }

  const subYear = () => {
    year.value--
  }

  const subMonth = () => {
    if (month.value === 1) {
      month.value = 12
      subYear()
    } else {
      month.value--
    }
  }

  const ENWEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
  const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日']

  const cal = (year: number, month: number) => {
    const { firstDate, lastDate } = getStartAndEnd(year, month)
    const firstDay = dayjs(firstDate).day()
    let predays
    if (weekStart == 'monday') {
      if (firstDay == 0) {
        predays = 6
      } else {
        predays = firstDay - 1
      }
    } else {
      predays = firstDay
    }
    const dates: Date[] = []
    if (predays != 0) {
      dates.push(...getDateFromPreMonth(year, month, predays))
    }
    const lastDayNum = Number.parseInt(lastDate.split('-')[2])
    for (let i = 1; i <= lastDayNum; i++) {
      dates.push({
        year: year,
        month: month,
        day: i,
        dStr: year + '-' + month + '-' + i
      })
    }
    let backDay = 0
    if (dates.length < 42) {
      backDay = 42 - dates.length
    }
    if (backDay != 0) {
      dates.push(...getDateFromNextMonth(year, month, backDay))
    }
    return genDateTable(dates)
  }

  const selectDate = (date: Date) => {
    const inputRef: HTMLInputElement | null = input.value
    const result = dayjs(date.dStr).format(format)
    if (inputRef) {
      inputRef.value = result
    }
    if (date.month != month.value) {
      month.value = date.month
    }
    if (date.year != year.value) {
      year.value = date.year
    }
    emit('update:modelValue', result)
  }

  const selectMonth = (event: Event, n: number) => {
    event.stopPropagation()
    month.value = n
    show.value = 'date'
  }

  const selectYear = (event: Event, n: number) => {
    event.stopPropagation()
    year.value = n
    chooseMonth()
    show.value = 'month'
  }
  const dateTableCache = ref<VNode | null>(null)
  const genDateTable = (dates: Date[]) => {
    const tHead: VNode[] = []
    for (let i = 0; i < 7; i++) {
      if (weekStart == 'monday') {
        tHead.push(h('th', WEEKDAYS[i]))
      } else {
        tHead.push(h('th', ENWEEKDAYS[i]))
      }
    }
    const tbody: VNode[] = []
    for (let i = 0; i < dates.length / 7; i++) {
      const tds: VNode[] = []
      for (let n = i * 7; n < (i + 1) * 7; n++) {
        tds.push(h('td', { onClick: () => selectDate(dates[n]) }, dates[n].day))
      }
      tbody.push(h('tr', tds))
    }
    dateTableCache.value = h('table', [h('thead', tHead), h('tbody', tbody)])
  }
  const monthTableCache = ref<VNode | null>(null)
  const genMonthTable = () => {
    const tbody: VNode[] = []
    for (let i = 0; i < 4; i++) {
      const tds: VNode[] = []
      for (let n = i * 3 + 1; n < (i + 1) * 3 + 1; n++) {
        tds.push(h('td', { onClick: (event: Event) => selectMonth(event, n) }, n))
      }
      tbody.push(h('tr', tds))
    }

    monthTableCache.value = h('table', [h('tbody', tbody)])
  }

  const yearTableCache = ref<VNode | null>(null)
  const genYearTable = () => {
    const tbody: VNode[] = []
    for (let i = year.value - 4; i <= year.value + 4; ) {
      const tds: VNode[] = []
      for (let n = 0; n < 3; n++, i++) {
        const currentYear = i
        tds.push(
          h(
            'td',
            {
              onClick: (event: Event) => {
                console.log(currentYear)
                selectYear(event, currentYear)
              }
            },
            currentYear
          )
        )
      }
      tbody.push(h('tr', tds))
    }
    yearTableCache.value = h('table', [h('tbody', tbody)])
  }

  const getStartAndEnd = (year: number, month: number) => {
    const daStr = year + '-' + month
    const firstDate = dayjs(daStr).startOf('month').format('YYYY-MM-DD')
    const lastDate = dayjs(daStr).endOf('month').format('YYYY-MM-DD')
    return {
      firstDate,
      lastDate
    }
  }

  const getDateFromPreMonth = (year: number, month: number, predays: number) => {
    if (month == 1) {
      month = 12
      year--
    } else {
      month--
    }
    const dateStr = year + '-' + month
    const lastDate: number = Number.parseInt(dayjs(dateStr).endOf('month').format('DD'))
    const da: Date[] = []
    for (let i = lastDate - predays + 1; i <= lastDate; i++) {
      da.push({
        year: year,
        month: month,
        day: i,
        dStr: year + '-' + month + '-' + i
      })
    }
    return da
  }

  const getDateFromNextMonth = (year: number, month: number, backDay: number) => {
    if (month == 12) {
      month = 1
      year++
    } else {
      month++
    }
    const da: Date[] = []
    for (let i = 1; i <= backDay; i++) {
      da.push({
        year: year,
        month: month,
        day: i,
        dStr: year + '-' + month + '-' + i
      })
    }
    return da
  }

  const chooseDate = (event: Event) => {
    if (disabled) {
      return
    }
    cal(year.value, month.value)
    event.stopPropagation()
    show.value = 'date'
  }

  const chooseMonth = (event?: Event) => {
    event?.stopPropagation()
    genMonthTable()
    show.value = 'month'
  }

  const chooseYear = (event: Event) => {
    event.stopPropagation()
    genYearTable()
    show.value = 'year'
  }

  const subYearPage = (event: Event) => {
    event.stopPropagation()
    year.value = year.value - 9
    genYearTable()
  }

  const addYearPage = (event: Event) => {
    event.stopPropagation()
    year.value = year.value + 9
    genYearTable()
  }

  return {
    addMonth,
    addYear,
    dateTableCache,
    monthTableCache,
    subYear,
    subMonth,
    chooseDate,
    chooseMonth,
    chooseYear,
    addYearPage,
    subYearPage,
    yearTableCache
  }
}

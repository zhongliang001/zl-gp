import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import ZlDatePicker from '..'
import dayjs from 'dayjs'
import ZlIcon from '../../icon'

describe('测试datepicker', () => {
  let today: number
  let month: number
  let year: number

  beforeAll(() => {
    today = dayjs().date()
    month = dayjs().month() + 1
    year = dayjs().year()
  })

  it('渲染内容', () => {
    const wrapper = mount(ZlDatePicker)
    expect(wrapper.get('input').isVisible()).toBe(true)
  })

  it('测试disabled', async () => {
    const wrapper = mount(ZlDatePicker, {
      props: {
        disabled: true
      }
    })
    wrapper.get('input').trigger('click')
    await flushPromises()
    expect(wrapper.find('.datepicker').isVisible()).toBe(false)
  })

  it('测试weekStart', async () => {
    {
      const wrapper = mount(ZlDatePicker, {
        props: {
          weekStart: 'monday'
        }
      })
      wrapper.get('input').trigger('click')
      await flushPromises()
      expect(wrapper.find('.datepicker').findAll('th')[0].text()).equal('一')
    }
    {
      const wrapper = mount(ZlDatePicker, {
        props: {
          weekStart: 'sunday'
        }
      })
      wrapper.get('input').trigger('click')
      await flushPromises()
      expect(wrapper.find('.datepicker').findAll('th')[0].text()).equal('日')
    }
  })

  it('测试选择日期', async () => {
    const wrapper = mount(ZlDatePicker)
    wrapper.get('input').trigger('click')
    await flushPromises()
    const tds = getTds(wrapper, today)
    expect(tds.length).toBeGreaterThan(0)
    const td: DOMWrapper<HTMLTableCellElement> = getTd(tds, today)
    await td.trigger('click')
    expect(td.classes()).toContain('sel')
    expect(wrapper.get('input').element.value).equals(dayjs().format('YYYY-MM-DD'))
  })

  it('测试增加或减少年份', async () => {
    // 减少一年
    {
      const wrapper = mount(ZlDatePicker)
      wrapper.get('input').trigger('click')
      await flushPromises()
      await wrapper.findAllComponents(ZlIcon)[0].trigger('click')
      const tds = getTds(wrapper, today)
      const td: DOMWrapper<HTMLTableCellElement> = getTd(tds, today)
      await td.trigger('click')
      expect(wrapper.get('input').element.value).equals(
        dayjs().subtract(1, 'year').format('YYYY-MM-DD')
      )
    }
    // 增加一年
    {
      const wrapper = mount(ZlDatePicker)
      wrapper.get('input').trigger('click')
      await flushPromises()
      await wrapper.findAllComponents(ZlIcon)[3].trigger('click')
      const tds = getTds(wrapper, today)
      const td: DOMWrapper<HTMLTableCellElement> = getTd(tds, today)
      await td.trigger('click')
      expect(wrapper.get('input').element.value).equals(dayjs().add(1, 'year').format('YYYY-MM-DD'))
    }
  })

  it('测试增加或减少月份', async () => {
    // 减少一月
    {
      const wrapper = mount(ZlDatePicker)
      wrapper.get('input').trigger('click')
      await flushPromises()
      await wrapper.findAllComponents(ZlIcon)[1].trigger('click')
      const tds = getTds(wrapper, today)
      const td: DOMWrapper<HTMLTableCellElement> = getTd(tds, today)
      await td.trigger('click')
      expect(wrapper.get('input').element.value).equals(
        dayjs().subtract(1, 'month').format('YYYY-MM-DD')
      )
    }
    // 增加一月
    {
      const wrapper = mount(ZlDatePicker)
      wrapper.get('input').trigger('click')
      await flushPromises()
      await wrapper.findAllComponents(ZlIcon)[2].trigger('click')
      const tds = getTds(wrapper, today)
      const td: DOMWrapper<HTMLTableCellElement> = getTd(tds, today)
      await td.trigger('click')
      expect(wrapper.get('input').element.value).equals(
        dayjs().add(1, 'month').format('YYYY-MM-DD')
      )
    }
  })

  it('测试月份临界点', async () => {
    {
      const wrapper = mount(ZlDatePicker)
      wrapper.get('input').trigger('click')
      await flushPromises()
      let times = 12 - month
      while (times >= 0) {
        await wrapper.findAllComponents(ZlIcon)[2].trigger('click')
        times--
      }
      const tds = getTds(wrapper, today)
      const td: DOMWrapper<HTMLTableCellElement> = getTd(tds, today)
      await td.trigger('click')
      expect(wrapper.get('input').element.value).equals(
        dayjs().add(1, 'year').month(0).format('YYYY-MM-DD')
      )
    }
    {
      const wrapper = mount(ZlDatePicker)
      wrapper.get('input').trigger('click')
      await flushPromises()
      let times = month
      while (times > 0) {
        await wrapper.findAllComponents(ZlIcon)[1].trigger('click')
        times--
      }
      const tds = getTds(wrapper, today)
      const td: DOMWrapper<HTMLTableCellElement> = getTd(tds, today)
      await td.trigger('click')
      expect(wrapper.get('input').element.value).equals(
        dayjs().subtract(1, 'year').month(11).format('YYYY-MM-DD')
      )
    }
  })

  it('选择月份', async () => {
    const mo = 4
    const wrapper = mount(ZlDatePicker)
    await wrapper.get('input').trigger('click')
    expect(wrapper.find('.monthpicker').exists()).toBe(true)
    await wrapper.find('.month-btn').trigger('click')
    await flushPromises()
    expect(wrapper.find('.monthpicker').isVisible()).toBe(true)
    const mtds = wrapper
      .find('.monthpicker')
      .findAll('td')
      .filter((t) => {
        if (Number(t.text()) === mo) {
          return true
        }
      })
    expect(mtds.length).equals(1)
    await mtds[0].trigger('click')
    const tds = getTds(wrapper, today)
    const td: DOMWrapper<HTMLTableCellElement> = getTd(tds, today)
    await td.trigger('click')
    expect(wrapper.get('input').element.value).equals(
      dayjs()
        .month(mo - 1)
        .format('YYYY-MM-DD')
    )
  })

  it('选择年份', async () => {
    const mo = 4
    const wrapper = mount(ZlDatePicker)
    await wrapper.get('input').trigger('click')
    await wrapper.find('.year-btn').trigger('click')
    expect(wrapper.find('.yearpicker').exists()).toBe(true)
    wrapper.find('.yearpicker').findAllComponents(ZlIcon)[0].trigger('click')
    await flushPromises()
    expect(wrapper.find('.yearpicker').findAll('td')[0].text()).equals(year - 13 + '')
    wrapper.find('.yearpicker').findAllComponents(ZlIcon)[1].trigger('click')
    await flushPromises()
    expect(wrapper.find('.yearpicker').findAll('td')[0].text()).equals(year - 4 + '')
    wrapper.find('.yearpicker').findAll('td')[0].trigger('click')
    await flushPromises()
    expect(wrapper.find('.monthpicker').isVisible()).toBe(true)
    const mtds = wrapper
      .find('.monthpicker')
      .findAll('td')
      .filter((t) => {
        if (Number(t.text()) === mo) {
          return true
        }
      })
    await mtds[0].trigger('click')
    const tds = getTds(wrapper, today)
    const td: DOMWrapper<HTMLTableCellElement> = getTd(tds, today)
    await td.trigger('click')
    expect(wrapper.get('input').element.value).equals(
      dayjs()
        .year(year - 4)
        .month(mo - 1)
        .format('YYYY-MM-DD')
    )
  })

  it('测试selectDate在2025年1月份选择2024年12月30日', async () => {
    const wrapper = mount(ZlDatePicker)
    await wrapper.get('input').trigger('click')
    await flushPromises()
    const year = wrapper.vm.getYear()
    while (year.value != 2025) {
      await wrapper.findAllComponents(ZlIcon)[0].trigger('click')
    }
    await wrapper.find('.month-btn').trigger('click')
    const mtds = wrapper
      .find('.monthpicker')
      .findAll('td')
      .filter((t) => {
        if (Number(t.text()) === 1) {
          return true
        }
      })
    expect(mtds.length).equals(1)
    await mtds[0].trigger('click')
    const tds = getTds(wrapper, 30)
    await tds[0].trigger('click')
    const mon = wrapper.vm.getMonth()
    expect(mon.value).equal(12)
    expect(wrapper.get('input').element.value).equals(dayjs('2024-12-30').format('YYYY-MM-DD'))
  })
})

function getTds(wrapper: ReturnType<typeof mount>, today: number) {
  return wrapper

    .get('.picker')
    .findAll('td')
    .filter((t) => {
      if (Number(t.text()) === today) {
        return true
      }
    })
}

function getTd(tds: DOMWrapper<HTMLTableCellElement>[], today: number) {
  let td: DOMWrapper<HTMLTableCellElement>
  if (tds.length === 1 || today < 15) {
    td = tds[0]
  } else {
    td = tds[1]
  }
  return td
}

import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ZlSelect, ZlSelectOption } from '..'
import ZlIcon from '../../icon'
import { nextTick } from 'vue'
describe('测试select', () => {
  it('测试渲染', () => {
    const wrapper = mount(ZlSelect, {
      props: {
        name: 'test'
      },
      slots: {
        default: () => <ZlSelectOption name="a" value="b" />
      }
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('测试选择', async () => {
    const data = {
      test: ''
    }
    const wrapper = mount(ZlSelect, {
      props: {
        name: 'test',
        modelValue: data.test,
        'onUpdate:modelValue': (val: string) => {
          data.test = val
        }
      },
      slots: {
        default: () => [
          <ZlSelectOption name="a" value="b" />,
          <ZlSelectOption name="c" value="d" />
        ]
      }
    })
    expect(wrapper.findComponent(ZlIcon).props('name')).toBe('arrow-right')
    wrapper.find('input').trigger('click')
    await flushPromises()
    expect(wrapper.findComponent(ZlIcon).props('name')).toBe('arrow-down')
    expect(wrapper.find('li').exists()).toBe(true)
    wrapper.findAll('li')[0].trigger('click')
    await flushPromises()
    await nextTick()
    expect(wrapper.find('.zl-select-options').classes()).toContain('hidden')
    expect(wrapper.find('input').element.value).eql('a')
    expect(data.test).eql('b')
    expect(wrapper.findComponent(ZlIcon).props('name')).toBe('arrow-right')
  })

  it('测试默认数据', async () => {
    const data = {
      test: 'd'
    }
    const wrapper = mount(ZlSelect, {
      props: {
        name: 'test',
        modelValue: data.test,
        'onUpdate:modelValue': (val: string) => {
          data.test = val
        }
      },
      slots: {
        default: () => [
          <ZlSelectOption name="a" value="b" />,
          <ZlSelectOption name="c" value="d" />
        ]
      }
    })
    expect(wrapper.find('input').element.value).eql('c')
    await wrapper.setProps({ modelValue: 'b' })
    await flushPromises()
    expect(wrapper.find('input').element.value).eql('a')
  })

  it('测试筛选', async () => {
    const data = {
      test: ''
    }
    const wrapper = mount(ZlSelect, {
      props: {
        name: 'test',
        modelValue: data.test,
        'onUpdate:modelValue': (val: string) => {
          data.test = val
        },
        filter: true
      },
      slots: {
        default: () => [
          <ZlSelectOption name="中国" value="b" />,
          <ZlSelectOption name="美国" value="d" />
        ]
      }
    })
    wrapper.find('input').setValue('中')
    await flushPromises()
    expect(wrapper.findAll('li')[0].classes().indexOf('hidden')).eql(-1)
    expect(wrapper.findAll('li')[1].classes()).toContain('hidden')
    wrapper.findAll('li')[0].trigger('click')
    await flushPromises()
    expect(wrapper.find('input').element.value).eql('中国')
    expect(data.test).eql('b')
  })

  it('测试不能筛选', async () => {
    const data = {
      test: ''
    }
    const wrapper = mount(ZlSelect, {
      props: {
        name: 'test',
        modelValue: data.test,
        'onUpdate:modelValue': (val: string) => {
          data.test = val
        },
        filter: false
      },
      slots: {
        default: () => [
          <ZlSelectOption name="中国" value="b" />,
          <ZlSelectOption name="美国" value="d" />
        ]
      }
    })
    wrapper.find('input').setValue('中')
    await flushPromises()
    expect(wrapper.findAll('li')[0].classes().indexOf('hidden')).eql(-1)
    expect(wrapper.findAll('li')[1].classes().indexOf('hidden')).eql(-1)
  })

  it('鼠标移出时应隐藏下拉并切换icon', async () => {
    const wrapper = mount(ZlSelect, {
      props: {
        name: 'test',
        modelValue: ''
      },
      slots: {
        default: () => [
          <ZlSelectOption name="a" value="b" />,
          <ZlSelectOption name="c" value="d" />
        ]
      }
    })
    await wrapper.find('input').trigger('click')
    expect(wrapper.find('.zl-select-options').classes()).not.toContain('hidden')
    expect(wrapper.findComponent(ZlIcon).props('name')).toBe('arrow-down')
    await wrapper.find('.zl-select-options ul').trigger('mouseleave')
    expect(wrapper.find('.zl-select-options').classes()).toContain('hidden')
    expect(wrapper.findComponent(ZlIcon).props('name')).toBe('arrow-right')
  })
})

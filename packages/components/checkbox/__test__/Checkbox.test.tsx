import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Checkbox from '../src/Checkbox.vue'
import { describe, expect, it } from 'vitest'
import ZlIcon from '../../icon'

describe('ZlCheckbox', () => {
  it('正常渲染', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: [],
        value: 'a',
        label: '测试'
      }
    })
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('测试')
  })

  it('点击切换选中状态', async () => {
    const model = ref<string[]>([])
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: model.value,
        value: 'a',
        label: '测试',
        'onUpdate:modelValue': (val: string[]) => (model.value = val)
      }
    })
    // 初始未选中
    expect(wrapper.find('input').element.checked).toBe(false)
    // 点击选中
    await wrapper.findComponent(ZlIcon).trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.setProps({ modelValue: model.value }) // 新增
    expect(model.value).toContain('a')
    expect(wrapper.find('input').element.checked).toBe(true)

    // 再次点击取消选中
    await wrapper.findComponent(ZlIcon).trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.setProps({ modelValue: model.value }) // 新增
    expect(model.value).not.toContain('a')
    expect(wrapper.find('input').element.checked).toBe(false)
  })

  it('禁用和只读时点击无效', async () => {
    const model = ref<string[]>([])
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: model.value,
        value: 'a',
        label: '测试',
        disabled: true,
        'onUpdate:modelValue': (val: string[]) => (model.value = val)
      }
    })
    await wrapper.trigger('click')
    expect(model.value).not.toContain('a')

    // 只读
    await wrapper.setProps({ disabled: false, readonly: true })
    await wrapper.trigger('click')
    expect(model.value).not.toContain('a')
  })

  it('tag皮肤渲染', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: [],
        value: 'a',
        label: '标签',
        skin: 'tag'
      }
    })
    expect(wrapper.find('.tag').exists()).toBe(true)
    expect(wrapper.find('.label').text()).toBe('标签')
  })
})

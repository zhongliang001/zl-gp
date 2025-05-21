import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/Button.vue'

describe('ZlButton', () => {
  it('渲染内容', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '测试按钮'
      }
    })
    expect(wrapper.text()).toBe('测试按钮')
  })

  it('应用类型class', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' }
    })
    expect(wrapper.classes().some((cls) => cls.includes('primary'))).toBe(true)
  })

  it('点击事件触发', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('禁用状态', () => {
    const wrapper = mount(Button, {
      attrs: { disabled: true }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})

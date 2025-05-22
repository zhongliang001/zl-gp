import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/Button.vue'
import { ZlForm, ZlFormItem } from '../../form'
import ZlInput from '../../input'

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

  it('测试reset', async () => {
    const wrapper = mount({
      setup() {
        const data = { test: '1' }
        return () => (
          <ZlForm v-model={data}>
            <ZlFormItem label="test" prop="test">
              <ZlInput type="text" name="test" v-model={data.test}></ZlInput>
            </ZlFormItem>
            <Button ref="bbb" nativeType="reset"></Button>
          </ZlForm>
        )
      }
    })
    expect(await wrapper.findComponent(Button).exists()).toBe(true)
    expect(wrapper.findComponent(ZlForm).exists()).toBe(true)
    wrapper.findComponent(ZlInput).setValue('x')
    expect(wrapper.findComponent(ZlForm).vm?.modelValue?.test).equals('x')
    wrapper.findComponent(Button).trigger('click')
    expect(wrapper.findComponent(ZlForm).vm?.modelValue?.test).equals('1')
  })
})

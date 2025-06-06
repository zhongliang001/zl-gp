import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ZlSwitch from '..'
import { reactive } from 'vue'

describe('测试switch组件', () => {
  it('测试渲染', () => {
    const wrapper = mount(ZlSwitch, {
      props: {
        name: 'test'
      }
    })
    expect(wrapper.findComponent(ZlSwitch).exists()).toBe(true)
  })

  it('测试click', async () => {
    const wrapper = mount({
      setup() {
        const data = reactive({
          test: false
        })
        return () => <ZlSwitch name="test" v-model={data.test}></ZlSwitch>
      }
    })

    wrapper.findComponent(ZlSwitch).trigger('click')
    await flushPromises()
    expect(wrapper.findAll('.circle')[0].classes()).toContain('right')
    expect(wrapper.findComponent(ZlSwitch).vm.modelValue).toBe(true)
  })
})

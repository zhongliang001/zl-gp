import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ZlRadio from '..'
import { reactive } from 'vue'

describe('测试radio', () => {
  it('测试渲染', () => {
    const wrapper = mount(ZlRadio, {
      props: {
        name: 't',
        value: '1'
      }
    })
    expect(wrapper.findAll('input').length).greaterThan(0)
  })

  it('测试click', async () => {
    const wrapper = mount({
      setup() {
        const data = reactive({
          t: ''
        })
        return () => (
          <template>
            <ZlRadio name="1" value="1" v-model={data.t}></ZlRadio>
            <ZlRadio name="1" value="2" v-model={data.t}></ZlRadio>
          </template>
        )
      }
    })
    wrapper.findAll('input')[0].trigger('click')
    await flushPromises()
    expect(wrapper.findComponent(ZlRadio).vm.modelValue).toBe('1')
    wrapper.findAll('input')[1].trigger('click')
    await flushPromises()
    expect(wrapper.findComponent(ZlRadio).vm.modelValue).toBe('2')
  })
})

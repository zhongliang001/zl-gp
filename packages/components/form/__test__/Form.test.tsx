import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ZlForm, ZlFormItem, type FormRule } from '..'
import ZlInput from '../../input'

describe('ZlForm', () => {
  it('表单测试validate', async () => {
    const wrapper = mount({
      setup() {
        const data = { test: '1' }
        const rule: FormRule[] = [
          {
            name: 'test',
            rules: [
              {
                reg: /^[A-Za-z]+$/,
                message: 'ssss'
              }
            ]
          }
        ]
        return () => (
          <ZlForm v-model={data} rules={rule}>
            <ZlFormItem label="test" prop="test">
              <ZlInput type="text" name="test" v-model={data.test}></ZlInput>
            </ZlFormItem>
          </ZlForm>
        )
      }
    })

    expect(await wrapper.findComponent(ZlForm).vm.formItems.length).toBe(1)
    expect(await wrapper.findComponent(ZlForm).vm.validate()).toBe(false)
    expect(await wrapper.findComponent(ZlFormItem).get('p').text()).toEqual('ssss')
    wrapper.findComponent(ZlInput).get('input').trigger('focus')
    await flushPromises()
    expect(await wrapper.findComponent(ZlFormItem).get('p').text()).toEqual('')
    wrapper.findComponent(ZlInput).get('input').setValue('abc')
    await flushPromises()
    expect(await wrapper.findComponent(ZlForm).vm.validate()).toBe(true)
    expect(await wrapper.findComponent(ZlFormItem).get('p').text()).toEqual('')
    await wrapper.findComponent(ZlForm).vm.reset()
    await flushPromises()
    expect(wrapper.findComponent(ZlInput).vm.modelValue).toEqual('1')
  })

})

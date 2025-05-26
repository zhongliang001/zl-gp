import { flushPromises, mount } from '@vue/test-utils'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import ZlInput from '..'
import { ZlForm, ZlFormItem, type FormRule } from '../../form'
import ZlButton from '../../button'

describe('ZlInput', () => {
  let originalSubmit: () => void
  beforeAll(() => {
    originalSubmit = HTMLFormElement.prototype.submit
    HTMLFormElement.prototype.submit = function () {}
  })
  it('渲染内容', () => {
    const wrapper = mount(ZlInput, {
      props: {
        modelValue: 'test',
        type: 'text',
        name: 'text'
      }
    })
    expect(wrapper.findComponent(ZlInput).exists()).toBe(true)
    expect(wrapper.findComponent(ZlInput).vm.modelValue).equals('test')
  })

  it('自动填充', () => {
    const wrapper = mount(ZlInput, {
      props: {
        type: 'password',
        name: 'password'
      }
    })
    expect(wrapper.findComponent(ZlInput).vm.autocomplete).equals('on')
    const wrapper2 = mount(ZlInput, {
      props: {
        type: 'text',
        name: 'text',
        autocomplete: 'off'
      }
    })
    expect(wrapper2.findComponent(ZlInput).vm.autocomplete).equals('off')
  })

  it('测试focus', async () => {
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
    await wrapper.findComponent(ZlForm).vm.validate()
    expect(await wrapper.findComponent(ZlFormItem).get('p').text()).toEqual('ssss')
    await wrapper.findComponent(ZlInput).get('input').trigger('focus')
    await flushPromises()
    expect(await wrapper.findComponent(ZlFormItem).get('p').text()).toEqual('')
  })

  it('测试blur', async () => {
    const wrapper = mount({
      setup() {
        const data = { test: '1' }
        const pattern = /^[A-Za-z]+$/
        return () => (
          <ZlForm v-model={data}>
            <ZlFormItem label="test" prop="test">
              <ZlInput type="text" name="test" pattern={pattern} v-model={data.test}></ZlInput>
            </ZlFormItem>
          </ZlForm>
        )
      }
    })
    await wrapper.findComponent(ZlInput).get('input').trigger('blur')
    expect(await wrapper.findComponent(ZlFormItem).get('p').text()).toEqual('输入数据格式不对')
    await wrapper.findComponent(ZlInput).setValue('S')
    await wrapper.findComponent(ZlInput).get('input').trigger('blur')
    expect(await wrapper.findComponent(ZlFormItem).get('p').text()).toEqual('')
  })

  it('测试format', async () => {
    const wrapper = mount(ZlInput, {
      props: {
        modelValue: 'test',
        type: 'text',
        name: 'text',
        formatter: (value: string | number | undefined) => {
          return 's' + value
        }
      }
    })
    await wrapper.findComponent(ZlInput).get('input').setValue('S')
    await wrapper.findComponent(ZlInput).get('input').trigger('blur')
    await flushPromises()
    expect(await wrapper.findComponent(ZlInput).get('input').element.value).toEqual('sS')
  })

  it('测试reset1', async () => {
    const wrapper = mount({
      setup() {
        const data = { test: 1 }
        const formatter = (value: string | number | undefined) => {
          return 's' + value
        }
        return () => (
          <ZlForm v-model={data}>
            <ZlFormItem label="test" prop="test">
              <ZlInput type="text" name="test" v-model={data.test} formatter={formatter}></ZlInput>
            </ZlFormItem>
          </ZlForm>
        )
      }
    })
    await wrapper.findComponent(ZlInput).get('input').setValue(2)
    await wrapper.findComponent(ZlInput).get('input').trigger('blur')
    await flushPromises()
    expect(await wrapper.findComponent(ZlInput).get('input').element.value).equals('s2')
    await wrapper.findComponent(ZlForm).vm.reset()
    expect(await wrapper.findComponent(ZlInput).get('input').element.value).toEqual('s1')
  })

  it('测试reset2', async () => {
    const wrapper = mount({
      setup() {
        const data = { test: '' }
        return () => (
          <ZlForm v-model={data}>
            <ZlFormItem label="test" prop="test">
              <ZlInput type="text" name="test" v-model={data.test}></ZlInput>
            </ZlFormItem>
            <ZlButton nativeType="reset"></ZlButton>
          </ZlForm>
        )
      }
    })
    await wrapper.findComponent(ZlInput).get('input').setValue(2)
    await wrapper.findComponent(ZlInput).get('input').trigger('blur')
    await flushPromises()
    expect(await wrapper.findComponent(ZlInput).get('input').element.value).equals('2')
    await wrapper.findComponent(ZlButton).get('button').trigger('click')
    expect(await wrapper.findComponent(ZlInput).get('input').element.value).toEqual('')
  })

  it('测试valid', async () => {
    const wrapper = mount({
      setup() {
        const data = { test: '' }
        const valid = (value: string | undefined) => {
          return value === '1'
        }
        return () => (
          <ZlForm v-model={data}>
            <ZlFormItem label="test" prop="test">
              <ZlInput type="text" name="test" v-model={data.test} valid={valid}></ZlInput>
            </ZlFormItem>
            <ZlButton nativeType="submit"></ZlButton>
          </ZlForm>
        )
      }
    })
    await wrapper.findComponent(ZlButton).get('button').trigger('click')
    expect(await wrapper.findComponent(ZlFormItem).get('p').text()).toEqual('校验失败')
    await wrapper.findComponent(ZlInput).get('input').setValue(1)
    await wrapper.findComponent(ZlButton).get('button').trigger('click')
    await flushPromises()
    expect(await wrapper.findComponent(ZlFormItem).get('p').text()).toEqual('')
  })

  afterAll(() => {
    HTMLFormElement.prototype.submit = originalSubmit
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ZlCard from '..'

describe('测试card', () => {
  it('测试渲染', () => {
    const wrapper = mount(ZlCard, {
      props: {
        height: 10
      }
    })
    expect(wrapper.findComponent(ZlCard).exists()).toBe(true)
  })
})

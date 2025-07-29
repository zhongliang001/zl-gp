import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ZlIcon from '..'

describe('测试Icon', () => {
  it('测试渲染', () => {
    const wrapper = mount(ZlIcon, {
      props: { name: 'close', color: 'red' }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('测试渲染color', () => {
    const wrapper = mount(ZlIcon, {
      props: { name: 'close', color: 'red' }
    })
    const paths = wrapper.findAll('path')
    expect(paths.length).greaterThan(0)
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i]
      const fill = path.element.getAttribute('fill')
      expect(fill).eql('red')
    }
  })
})

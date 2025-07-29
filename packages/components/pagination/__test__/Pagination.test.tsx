import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ZlPagination from '..'
import ZlIcon from '../../icon'

describe('测试Pagination', () => {
  it('测试渲染', () => {
    const wrapper = mount(ZlPagination, {
      props: {
        pageNum: 10
      }
    })
    expect(wrapper.find('.zl-pagination').exists()).toBe(true)
  })

  it('测试页面切换', () => {
    const wrapper = mount(ZlPagination, {
      props: {
        pageNum: 10
      }
    })
    expect(wrapper.findAll('span').length).eql(10)
    wrapper.findAll('span')[5].trigger('click')
    expect(wrapper.vm.currentPageNum).eql(6)
    // 前往第一页
    wrapper.findAllComponents(ZlIcon)[0].trigger('click')
    expect(wrapper.vm.currentPageNum).eql(1)
    // 前往最后一页
    wrapper.findAllComponents(ZlIcon)[3].trigger('click')
    expect(wrapper.vm.currentPageNum).eql(10)
    // 往前一页
    wrapper.findAllComponents(ZlIcon)[1].trigger('click')
    expect(wrapper.vm.currentPageNum).eql(9)
    // 往后一页
    wrapper.findAllComponents(ZlIcon)[2].trigger('click')
    expect(wrapper.vm.currentPageNum).eql(10)
  })
})

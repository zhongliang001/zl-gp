import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ZlTree from '..'
import { nextTick } from 'vue'
import ZlIcon from '../../icon'

describe('ZlTree', () => {
  const data = [
    {
      name: '一年级',
      value: '1',
      nodeId: '1',
      children: [
        {
          name: '1班',
          value: '11',
          nodeId: '11',
          children: [
            {
              name: '张三',
              nodeId: 'zs',
              value: 'zs'
            },
            {
              name: '李四',
              nodeId: 'ls',
              value: 'ls'
            }
          ]
        },
        {
          name: '2班',
          nodeId: '12',
          value: '12'
        }
      ]
    },
    {
      name: '二年级',
      value: '2',
      nodeId: '2',
      children: [
        {
          name: '1班',
          nodeId: '21',
          value: '21',
          children: [
            {
              name: '王五',
              nodeId: 'ww',
              value: 'ww'
            }
          ]
        }
      ]
    }
  ]

  it('正常渲染', () => {
    const wrapper = mount(ZlTree, {
      props: {
        data,
        checkable: false
      }
    })
    expect(wrapper.find('.zl-tree').exists()).toBe(true)
    expect(
      wrapper
        .findComponent({
          name: 'ZlTreeNode'
        })
        .exists()
    ).toBe(true)
    expect(
      wrapper
        .findComponent({
          name: 'ZlCheckbox'
        })
        .exists()
    ).toBe(false)
  })

  it('测试展开', async () => {
    const wrapper = mount(ZlTree, {
      props: {
        data,
        checkable: false
      }
    })
    const nodes = wrapper.findAllComponents({ name: 'ZlTreeNode' })
    expect(nodes[0].vm.expand).toBe(false)
    // 展开
    nodes[0].trigger('click')
    await nextTick()
    expect(nodes[0].vm.expand).toBe(true)
    // 收起
    nodes[0].trigger('click')
    await nextTick()
    expect(nodes[0].vm.expand).toBe(false)
  })

  it('测试默认展开', async () => {
    const wrapper = mount(ZlTree, {
      props: {
        data,
        checkable: false,
        expand: true
      }
    })
    const nodes = wrapper.findAllComponents({ name: 'ZlTreeNode' })
    nodes.forEach((node) => {
      expect(node.vm.expand).toBe(true)
    })
  })

  it('可以进行选择的tree', async () => {
    const wrapper = mount(ZlTree, {
      props: {
        data,
        checkable: true
      }
    })
    expect(
      wrapper
        .findComponent({
          name: 'ZlCheckbox'
        })
        .exists()
    ).toBe(true)
    const checkboxs = wrapper.findAllComponents({
      name: 'ZlCheckbox'
    })
    expect(checkboxs.length).toBe(8)
    await flushPromises()
    checkboxs[1].findComponent(ZlIcon).trigger('click')
    await flushPromises()
    const result = wrapper.vm.getTreeNodeByNodeId('11')
    expect(result?.getSelectCount()).toBe(2)
    expect(result?.selectValue.length).toBe(1)
    expect(result?.halfSelected).toBe(false)
    expect(wrapper.vm.getSelectedTreeNode().length).toBe(3)
    expect(wrapper.vm.getSelectedValue().length).toBe(3)

    await checkboxs[2].findComponent(ZlIcon).trigger('click')
    await nextTick()
    expect(result?.halfSelected).toBe(true)
    expect(wrapper.vm.getSelectedTreeNode().length).toBe(1)
    expect(wrapper.vm.getSelectedValue().length).toBe(1)

    await checkboxs[3].findComponent(ZlIcon).trigger('click')
    await nextTick()
    expect(result?.selectValue.length).toBe(0)
    expect(wrapper.vm.getSelectedTreeNode().length).toBe(0)
    expect(wrapper.vm.getSelectedValue().length).toBe(0)
  })

  it('测试getTreeNodeByNodeId', () => {
    const wrapper = mount(ZlTree, {
      props: {
        data,
        checkable: false
      }
    })
    const result = wrapper.vm.getTreeNodeByNodeId('ww')
    expect(result?.nodeId).eql('ww')
  })
})

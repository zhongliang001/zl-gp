import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ZlTransfer, { useTransfer } from '..'
import { nextTick, reactive, ref } from 'vue'
import ZlButton from '../../button'

describe('测试Transfer', () => {
  let wrapper: ReturnType<typeof mount>
  beforeEach(() => {
    wrapper = mount({
      setup() {
        const options = [
          { value: '1', name: '黑龙江省' },
          { value: '2', name: '辽宁省' },
          { value: '3', name: '山东省' },
          { value: '4', name: '吉林省' },
          { value: '5', name: '江苏省' },
          { value: '6', name: '上海市' },
          { value: '7', name: '浙江省' },
          { value: '8', name: '福建省' },
          { value: '9', name: '广东省' }
        ]
        const data = reactive<{ a: string[] }>({
          a: []
        })
        return () => (
          <ZlTransfer
            options={options}
            modelValue={data.a}
            ltitle="省份列表"
            rtitle="已选省份"
            onUpdate:modelValue={(val: string[]) => (data.a = val)}></ZlTransfer>
        )
      }
    })
  })

  it('测试渲染', () => {
    expect(wrapper.findAll('ul')[0].findAll('li').length).toBe(9)
  })

  it('测试选择一个', async () => {
    wrapper.findAll('ul')[0].findAll('li')[0].trigger('click')
    wrapper.findAllComponents(ZlButton)[1].trigger('click')
    await flushPromises()
    expect(wrapper.findAll('ul')[1].findAll('li').length).toBe(1)
    expect(wrapper.findComponent(ZlTransfer).vm.modelValue.length).toBe(1)
    wrapper.findAll('ul')[1].findAll('li')[0].trigger('click')
    wrapper.findAllComponents(ZlButton)[2].trigger('click')
    await flushPromises()
    expect(wrapper.findAll('ul')[1].findAll('li').length).toBe(0)
    expect(wrapper.findComponent(ZlTransfer).vm.modelValue.length).toBe(0)
  })

  it('测试选择全选', async () => {
    wrapper.findAllComponents(ZlButton)[0].trigger('click')
    await flushPromises()
    expect(wrapper.findAll('ul')[1].findAll('li').length).toBe(9)
    expect(wrapper.findComponent(ZlTransfer).vm.modelValue.length).toBe(9)
    wrapper.findAll('ul')[1].findAll('li')[0].trigger('click')
    wrapper.findAllComponents(ZlButton)[3].trigger('click')
    await flushPromises()
    expect(wrapper.findAll('ul')[1].findAll('li').length).toBe(0)
    expect(wrapper.findComponent(ZlTransfer).vm.modelValue.length).toBe(0)
  })

  it('测试选择筛选', async () => {
    expect(wrapper.findAll('input').length).toBe(0)
  })

  it('测试选择筛选', async () => {
    const wrapper2 = mount({
      setup() {
        const options = [
          { value: '1', name: '黑龙江省' },
          { value: '2', name: '辽宁省' },
          { value: '3', name: '山东省' },
          { value: '4', name: '吉林省' },
          { value: '5', name: '江苏省' },
          { value: '6', name: '上海市' },
          { value: '7', name: '浙江省' },
          { value: '8', name: '福建省' },
          { value: '9', name: '广东省' }
        ]
        const data = reactive<{ a: string[] }>({
          a: []
        })
        return () => (
          <ZlTransfer
            options={options}
            modelValue={data.a}
            ltitle="省份列表"
            rtitle="已选省份"
            filter={true}
            onUpdate:modelValue={(val: string[]) => (data.a = val)}></ZlTransfer>
        )
      }
    })
    wrapper2.findAll('input')[0].setValue('省')
    await flushPromises()
    expect(wrapper2.findAll('ul')[0].findAll('li').length).toBe(8)
  })

  it('leftIdx 变化时会调用 rightBox.reset', async () => {
    const leftBox = ref({ selIdx: -1 })
    const rightBox = ref({ reset: vi.fn(), selIdx: -1 })
    const options = [{ value: 'a', name: 'A' }]
    const emit = vi.fn()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    useTransfer(options, leftBox, rightBox, emit)

    leftBox.value.selIdx = 0
    await nextTick()

    expect(rightBox.value.reset).toHaveBeenCalled()
  })
})

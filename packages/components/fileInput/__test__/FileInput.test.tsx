import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FileInput from '../src/FileInput.vue'

describe('ZlFileInput', () => {
  it('初始渲染', () => {
    const wrapper = mount(FileInput, {
      props: { name: 'test' }
    })
    expect(wrapper.find('input[type="file"]').exists()).toBe(true)
    expect(wrapper.find('ul').exists()).toBe(true)
    expect(wrapper.find('div').text()).toContain('点击选择需要上传的文件')
  })

  it('inputHandler 能添加文件', async () => {
    const wrapper = mount(FileInput, {
      props: { name: 'test' }
    })
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' })
    // mock input.files
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: false
    })
    await input.trigger('input')
    // files 已添加
    expect(wrapper.vm.files.length).toBe(1)
    expect(wrapper.vm.files[0].name).toBe('foo.txt')
    // 列表渲染
    expect(wrapper.find('li').text()).toContain('foo.txt')
  })

  it('deleteFile 能删除文件', async () => {
    const wrapper = mount(FileInput, {
      props: { name: 'test' }
    })
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' })
    // mock input.files
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: false
    })
    await input.trigger('input')
    expect(wrapper.vm.files.length).toBe(1)
    // 删除
    await wrapper.find('li .icon').trigger('click')
    expect(wrapper.vm.files.length).toBe(0)
  })
})

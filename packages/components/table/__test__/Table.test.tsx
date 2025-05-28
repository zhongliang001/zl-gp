import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ZlTable, ZlTableColumn } from '..'
import { ZlInput } from '../../input'
import { reactive } from 'vue'

describe('测试Table', () => {
  it('测试表格渲染', async () => {
    const data = reactive([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    const wrapper = mount(ZlTable, {
      props: {
        data: data
      },
      slots: {
        default: () => [
          <ZlTableColumn props="date" name="Date" />,
          <ZlTableColumn props="name" name="Name" />
        ]
      }
    })
    await flushPromises()
    expect(wrapper.findAll('thead')[0].findAll('th').length).equal(2)
    expect(wrapper.findAll('thead')[0].findAll('th')[0].text()).equal('Date')
    expect(wrapper.findAll('tr').length).equal(1)
  })

  it('测试可编辑表格', async () => {
    const data = reactive([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    const wrapper = mount(ZlTable, {
      props: {
        data: data
      },
      slots: {
        default: () => [
          <ZlTableColumn
            props="date"
            name="Date"
            v-slots={{
              default: (scope: {
                row:
                  | {
                      [key: string]: string | number
                    }
                  | undefined
                index: number | undefined
              }) =>
                scope && scope.row ? (
                  <ZlInput
                    name="test"
                    placeholder="请输入"
                    type="text"
                    modelValue={scope.row.date}
                    onUpdate:modelValue={(val: string | number) => {
                      if (scope.row) scope.row.date = val
                    }}
                  ></ZlInput>
                ) : null
            }}
          />,
          <ZlTableColumn props="name" name="Name" />
        ]
      }
    })
    await flushPromises()
    expect(wrapper.findAll('tr')[0].find('input').element.value).equal('2016-05-03')
    wrapper.findAll('tr')[0].find('input').setValue('2025-01-01')
    expect(wrapper.findAll('tr')[0].find('input').element.value).equal('2025-01-01')
  })

  it('测试表格新增一行', async () => {
    const data = reactive([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    const wrapper = mount(ZlTable, {
      props: {
        data: data
      },
      slots: {
        default: () => [
          <ZlTableColumn props="date" name="Date" />,
          <ZlTableColumn props="name" name="Name" />
        ]
      }
    })
    await flushPromises()
    expect(wrapper.findAll('tr').length).equal(1)
    data.push({
      date: '2016-05-02',
      name: 'Tom2',
      address: 'No. 189, Grove St, Los Angeles'
    })
    await flushPromises()
    expect(wrapper.findAll('tr').length).equal(2)
  })

  it('测试表格单选', async () => {
    const data = reactive([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom2',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    const wrapper = mount(ZlTable, {
      props: {
        data: data,
        isShowChecked: true,
        isIndex: true
      },
      slots: {
        default: () => [
          <ZlTableColumn props="date" name="Date" />,
          <ZlTableColumn props="name" name="Name" />
        ]
      }
    })
    await flushPromises()
    wrapper.findAll('tr')[0].trigger('click')
    await flushPromises()
    expect(wrapper.vm.getSel()).eql({
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    })
    wrapper.findAll('tr')[1].trigger('click')
    await flushPromises()
    expect(wrapper.vm.getSel()).eql({
      date: '2016-05-02',
      name: 'Tom2',
      address: 'No. 189, Grove St, Los Angeles'
    })
  })

  it('测试表格多选', async () => {
    const data = reactive([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom2',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    const wrapper = mount(ZlTable, {
      props: {
        data: data,
        selType: 'multiple',
        isShowChecked: true
      },
      slots: {
        default: () => [
          <ZlTableColumn props="date" name="Date" />,
          <ZlTableColumn props="name" name="Name" />
        ]
      }
    })
    await flushPromises()
    expect(wrapper.vm.getSel()).eql([])
    wrapper.findAll('tr')[0].trigger('click')
    expect(wrapper.vm.getSel()).eql([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    wrapper.findAll('tr')[1].trigger('click')
    expect(wrapper.vm.getSel()).eql([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom2',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    wrapper.findAll('tr')[1].trigger('click')
    expect(wrapper.vm.getSel()).eql([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
    data.push({
      date: '2016-05-02',
      name: 'Tom2',
      address: 'No. 189, Grove St, Los Angeles'
    })
    await flushPromises()
    expect(wrapper.vm.getSel()).eql([])
  })
})

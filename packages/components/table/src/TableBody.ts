import {
  h,
  isVNode,
  nextTick,
  type Ref,
  type ShallowRef,
  type VNode,
  type VNodeNormalizedChildren
} from 'vue'
import type { TableColumn } from './TableColumn'
import { ZlInput } from '../../index'
import { usenamespace } from '@zl-gp/hooks'

export interface TableBodyProps {
  store: {
    data: Ref<{ [key: string]: string }[]>
    columns: TableColumn[]
    isIndex: boolean
    isShowChecked: boolean
    selType: 'single' | 'multiple'
    select: (index: number) => void
    selIndx: Ref<number>
    selMulInd: Ref<number[]>
  }
}

export const useTableBody = (store: TableBodyProps['store'], tbody: ShallowRef<VNode>) => {
  const trClick = (index: number, node: VNode) => {
    store.select(index)
    genTableBody()
    if (node) {
      const children: VNodeNormalizedChildren = node.children
      if (Array.isArray(children)) {
        children.forEach((ele) => {
          if (isVNode(ele) && ele.el) {
            if (ele.el.type === 'radio' || ele.el.typ === 'checkbox') {
              ele.el.checked = true
            }
          }
        })
      }
    }
  }

  const { namespace } = usenamespace('table-body')

  const genTableBody = async () => {
    const children: VNode[] = []
    const isIndex = store.isIndex
    const isShowChecked = store.isShowChecked
    const selType = store.selType
    const selIndx = store.selIndx
    const selMulInd = store.selMulInd
    store.data.value.forEach((dt, index) => {
      const childNodes: VNode[] = []
      const scope = {
        row: dt,
        index: index
      }
      if (isIndex) {
        const nd = h('td', index + 1)
        childNodes.push(nd)
      }
      let selNd: VNode
      if (isShowChecked) {
        selNd = h(
          'td',
          {
            class: ['zl-td'],
            style: {
              width: 16 + 'px'
            }
          },
          h(ZlInput, {
            name: 'sel',
            id: 'input-' + index,
            'aria-label': index,
            type: selType === 'single' ? 'radio' : selType === 'multiple' ? 'checkbox' : 'radio'
          })
        )
        childNodes.push(selNd)
      }

      if (dt) {
        store.columns?.forEach((column) => {
          if (column.slots && column.slots.default) {
            const nodes: VNode[] = column.slots.default(scope)
            nodes.forEach((n) => {
              if (n.type === Comment) {
                return n
              }
            })
            childNodes.push(
              h(
                'td',
                {
                  class: 'zl-td',
                  key: 1
                },
                { default: () => [nodes] }
              )
            )
          } else {
            const node = h('td', dt[column.props])
            childNodes.push(node)
          }
        })
      }
      if (childNodes.length != 0) {
        const node = h(
          'tr',
          {
            class: [
              'zl-tr',
              { 'is-selected': selIndx.value === index || selMulInd.value.indexOf(index) !== -1 }
            ],
            onClick: (event: Event) => {
              event.stopPropagation()
              trClick(index, selNd)
            }
          },
          { default: () => childNodes }
        )
        children.push(node)
      }
    })

    tbody.value = h('tbody', { class: namespace.className }, children)
    await nextTick()
  }

  return {
    genTableBody
  }
}

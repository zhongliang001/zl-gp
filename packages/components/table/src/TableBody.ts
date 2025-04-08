import {
  h,
  isVNode,
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
  }
}

export const useTableBody = (store: TableBodyProps['store'], tbody: ShallowRef<VNode>) => {
  const trClick = (index: number, node: VNode) => {
    store.select(index)
    if (node) {
      const children: VNodeNormalizedChildren = node.children
      if (Array.isArray(children)) {
        children.forEach((ele) => {
          if (isVNode(ele) && ele.el) {
            ele.el.dispatchEvent(new Event('click'))
          }
        })
      }
    }
  }

  const { namespace } = usenamespace('table-body')

  const genTableBody = () => {
    const children: VNode[] = []
    const isIndex = store.isIndex
    const isShowChecked = store.isShowChecked
    const selType = store.selType
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
            onClick: () => {
              trClick(index, selNd)
            }
          },
          { default: () => childNodes }
        )
        children.push(node)
      }
    })

    tbody.value = h('tbody', { class: namespace.className }, children)
  }

  return {
    genTableBody
  }
}

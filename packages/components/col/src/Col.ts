import type { RowContext } from '@zl-gp/components/row/src/Row'
import { computed } from 'vue'

export interface ColProps {
  span: number
  offset?: number
}

const useCol = (props: ColProps, gutter: number, rowContext: RowContext | undefined) => {
  const span = props.span
  const offset = props.offset ? props.offset : 0
  const _prop = computed(() => {
    return {
      style: {
        'padding-left': gutter ? gutter / 2 + 'px' : '',
        'padding-right': gutter ? gutter / 2 + 'px' : '',
        'margin-left': rowContext
          ? rowContext.num != 0
            ? (1 / rowContext.num) * offset * 100 + '%'
            : '100 %'
          : '100 %',
        width: rowContext
          ? rowContext.num != 0
            ? (1 / rowContext.num) * span * 100 + '%'
            : '100 %'
          : '100 %'
      }
    }
  })
  return {
    _prop
  }
}

export default useCol

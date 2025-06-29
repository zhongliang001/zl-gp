import { ref, watch } from 'vue'
import type { ColProps } from './types'
import type { RowContext } from '../../row'

const useCol = (props: ColProps, gutter: number, rowContext: RowContext | undefined) => {
  const span = props.span ? props.span : 0
  const offset = props.offset ? props.offset : 0
  const _prop = ref()
  watch(
    () => rowContext?.num,
    () => {
      generateStyel()
    }
  )

  const generateStyel = () => {
    _prop.value = {
      style: {
        'padding-left': gutter ? gutter / 2 + 'px' : '',
        'padding-right': gutter ? gutter / 2 + 'px' : '',
        'margin-left':
          rowContext && rowContext.num
            ? rowContext.num != 0
              ? (1 / rowContext.num) * offset * 100 + '%'
              : '100 %'
            : '100 %',
        width:
          rowContext && rowContext.num
            ? rowContext.num != 0
              ? (1 / rowContext.num) * span * 100 + '%'
              : '100 %'
            : '100 %'
      }
    }
  }
  return {
    _prop
  }
}

export default useCol

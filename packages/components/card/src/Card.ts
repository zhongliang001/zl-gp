import type { CardProps } from './types'

const useCard = (props: CardProps) => {
  const _props = {
    style: {
      height: props.height + 'px',
      'background-color': props.backgroundColor
    }
  }
  return {
    _props
  }
}

export { useCard }

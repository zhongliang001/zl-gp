export interface CardProps {
  height?: number
  bodyHeight?: number
  headerHeight?: number
  footerHeight?: number
  backgroundColor?: string
}

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

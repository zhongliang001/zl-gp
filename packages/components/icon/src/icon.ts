export interface IconProps {
  name: string
  width?: number
  height?: number
  color?: string
}

export type IconJsonType = { [key: string]: InconInfo }

export type InconInfo = {
  d: string[]
  color: string
}

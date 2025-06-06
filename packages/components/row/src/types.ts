export interface RowProps {
  columns?: number
  gutter?: number
}

export type RowContext = {
  gutter?: number
  addCol?: (span: number, offset: number) => void
  num?: number
}

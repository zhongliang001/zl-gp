import { pullAt } from 'lodash-es'

export const moveElement = (arr: unknown[], fromIndex: number, toIndex: number) => {
  const item = pullAt(arr, [fromIndex])[0]
  arr.splice(toIndex, 0, item)
  return arr
}

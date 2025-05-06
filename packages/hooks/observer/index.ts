import type { Ref } from 'vue'

export const useObserver = (_ref: Ref, offsetWidth: Ref) => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === _ref.value) {
        offsetWidth.value = entry.contentRect.width
      }
    }
  })
  resizeObserver.observe(_ref.value)
}

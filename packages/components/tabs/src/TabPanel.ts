import { computed, onMounted } from "vue"
import type { TabsContext } from "./types"

export const useTabPanel = (tb: TabsContext | undefined, name: string) => {
  onMounted(() => {
    if (tb) {
      tb.addChildren(name)
    }
  })

  const selName = computed(() => {
    if (tb) {
      return tb.selName
    } else {
      return { name: name }
    }
  })
  return {
    selName
  }
}

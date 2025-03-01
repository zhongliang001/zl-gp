import { ref } from 'vue'

export const useInputMethod = () => {
  const isComposing = ref(false)
  const compositionStart = () => {
    isComposing.value = true
  }

  const compositionEnd = (e: Event, handler: (target: EventTarget | null) => void) => {
    isComposing.value = false
    const target = e.target
    handler(target)
  }

  const handlerInput = (event: Event, handler: (target: EventTarget | null) => void) => {
    const target = event.target
    if (!isComposing.value) {
      handler(target)
    }
  }

  return {
    handlerInput,
    compositionStart,
    compositionEnd
  }
}

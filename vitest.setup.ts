if (typeof globalThis.ResizeObserver === 'undefined') {
  class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }
  (globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver = ResizeObserver
}

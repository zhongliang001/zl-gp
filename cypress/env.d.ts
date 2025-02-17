/// <reference types="vite/client" />

declare module '*.vue' {
  import type { App, DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any> & {
    install(app: App): void
  }
  export default component
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

export type SFCWithInstall<T> = T & Plugin

export function makeInstaller(components: Plugin[]) {
  const installer = (app: App) => each(components, (c) => app.use(c))
  return installer as Plugin
}

export const withInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name
    app.component(name, component as Plugin)
  }
  return component as SFCWithInstall<T>
}

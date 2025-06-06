import type { InjectionKey } from 'vue'
import type { RowContext } from './types'

export const RowInjectKey: InjectionKey<RowContext> = Symbol('menuInjectKey')

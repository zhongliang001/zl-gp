import type { Plugin } from 'vue'
import { ZlAside } from '@zl-gp/components'
import { ZlContainer } from '@zl-gp/components'
import { ZlHeader } from '@zl-gp/components'
import { ZlMain } from '@zl-gp/components'

export default { ZlAside, ZlContainer, ZlHeader, ZlMain } as unknown as Plugin[]

export * from '@zl-gp/components'

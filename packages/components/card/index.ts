import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Card from './src/Card.vue'

export const ZlCard: SFCWithInstall<typeof Card> = withInstall(Card)
export default ZlCard
export * from './src/Card'
export * from './src/instances'
export * from './src/types'

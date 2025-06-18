import { withInstall } from '@zl-gp/utils'
import Transfer from './src/Transfer.vue'
import TransferBox from './src/TransferBox.vue'

export const ZlTransfer = withInstall(Transfer)
export const ZlTransferBox = withInstall(TransferBox)

export * from './src/instances'
export * from './src/Transfer'
export * from './src/TransferBox'
export * from './src/types'

export default ZlTransfer

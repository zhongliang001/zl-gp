import { withInstall, type SFCWithInstall } from '@zl-gp/utils'
import Tree from './src/Tree.vue'
import TreeNode from './src/TreeNode.vue'

export const ZlTree: SFCWithInstall<typeof Tree> = withInstall(Tree)

export const ZlTreeNode: SFCWithInstall<typeof TreeNode> = withInstall(TreeNode)

export * from './src/common'
export * from './src/instances'
export * from './src/Tree'
export * from './src/TreeNode'
export * from './src/types'

export default ZlTree

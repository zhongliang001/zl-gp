import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vitest.config.ts",
  "./packages/core/vite.es.config.ts"
])

import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vitest.config.ts",
  "./packages/play/vite.config.ts",
  "./packages/core/vite.es.config.ts"
])

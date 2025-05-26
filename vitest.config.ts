import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        enabled: true,
        exclude: [
          '**/play/**',
          '**/dist/**',
          '**/theme/**',
          "**/packages/core/**",
          "*config.ts",
          "vitest.workspace.ts",
          "**/index.ts"
        ],
        excludeAfterRemap: true,
        include: ['**/*.{js,ts,vue}'],
        provider: 'v8', // 使用 v8 覆盖率
        reportsDirectory: './coverage',
        reporter: ['text', 'html']
      },
    },
  }),
)

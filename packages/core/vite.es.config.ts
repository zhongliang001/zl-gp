import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { readdirSync, readdir } from 'fs'
import fs from 'fs'
import sass from 'rollup-plugin-sass'
import { filter, map, delay } from 'lodash-es'

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}

function moveStyles() {
  readdir('./dist/es/', (err) => {
    if (err) return delay(moveStyles, 300)
    fs.renameSync('./dist/es/index.css', './dist/index.css')
  })
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      pathsToAliases: true,
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
      afterBuild: moveStyles
    }),
    sass({ api: 'modern' })
  ],
  build: {
    outDir: 'dist/es',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'ZlGp',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', '@popperjs/core', 'async-validator'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') return 'index.css'
          return assetInfo.name as string
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('/packages/utils')) {
            return 'utils'
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks'
          }
          for (const dirName of getDirectoriesSync('../components')) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName
            }
          }
        },
        chunkFileNames(id) {
          return id.name + '.js'
        }
      }
    }
  }
})

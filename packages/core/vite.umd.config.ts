import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist/umd',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'ZlGp',
      fileName: 'index',
      formats: ['umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'vue'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') return 'index.css'
          return assetInfo.name as string
        }
      }
    }
  }
})

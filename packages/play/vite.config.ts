import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { fileURLToPath } from 'url'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: 'dist/test.html', // 分析图生成的文件名
      open: true // 如果存在本地服务端口，将在打包后自动展示
    }),
    viteCompression(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      packagePresets: [
        {
          package: 'zl-gp',
          ignore: ['default', 'zl-gp']
        }
      ],
      dts: true
    }),
    Components({
      resolvers: [
        (name) => {
          if (name === 'default' || name === 'RouterLink' || name === 'RouterView') {
            return undefined
          }
          const resolved = {
            name: name,
            from: `zl-gp`
          }
          return resolved
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: 'terser',
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: false
      }
    },
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          if (id.includes('zl-gp')) {
            const split = id.toString().split('node_modules/')[2].split('/')
            return split[split.length - 1].toString()
          }
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
          if (id.includes('modules')) {
            return id.toString().split('modules/')[1].split('/')[0].toString()
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
          return `js/${fileName}/[name].[hash].js`
        }
      }
    }
  }
})

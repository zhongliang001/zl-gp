import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      dirs: './src',
      exclude: ['vue-router', /node_modules/],
      deep: true,
      resolvers: [
        (name) => {
          if (name === 'default' || name === 'RouterLink' || name === 'RouterView') {
            return undefined
          }
          const resolved = {
            name: name,
            from: `zl-gp` // 修改解析逻辑，确保所有组件路径正确
          }
          return resolved
        }
      ]
    })
  ]
})

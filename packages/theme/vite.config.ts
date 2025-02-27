import sass from 'rollup-plugin-sass'
import { defineConfig } from 'vite'
import { resolve } from 'path'

const path = resolve('../core/dist/theme')
const create = (theme: string) => {
  return defineConfig({
    build: {
      outDir: path + '/' + theme + '/',
      emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, './' + theme + '/index.ts'),
        name: 'ZlGp',
        fileName: 'index',
        formats: ['es']
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          format: 'esm',
          assetFileNames: 'index.css'
        },
        plugins: [sass({ api: 'modern' })]
      }
    }
  })
}
// 获取pack.json script 参数按照不同主题来打包
const args = process.argv.slice(2)

export default defineConfig(create(args[3]))

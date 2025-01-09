import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_BASE || '/',
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ],
        dts: 'src/auto-imports.ts'
      }),
      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/auto-components.ts',
        deep: true
      }),
      Pages(),
      Layouts(),
      Unocss({ presets: [presetAttributify(), presetUno()] })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      cors: true,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_SERVER,
          rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true
        }
      }
    }
  }

})

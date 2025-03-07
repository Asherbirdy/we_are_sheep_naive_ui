import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { presetAttributify, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'
import Layouts from 'vite-plugin-vue-layouts'
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_BASE || '/',
    plugins: [
      vue(),
      VitePWA({
        manifest: {
          name: 'Name of your app',
          short_name: 'Short name of your app',
          description: 'Description of your app',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }),
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
      // open: true,
      port: Number(env.VITE_PORT) || 5173,
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

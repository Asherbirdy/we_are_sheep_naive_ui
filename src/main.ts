import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { VueQueryPlugin  } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from './App.vue'
import createI18n from './i18n'
import 'uno.css'
import router from './router'

import './assets/scss/global.scss'
import './assets/scss/transition.scss'

const app = createApp(App)
const queryClientConfig: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 1
      }
    }
  }
}
app.use(router)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(VueQueryPlugin, queryClientConfig)
app.use(createI18n)

app.mount('#app')

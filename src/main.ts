import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { VueQueryPlugin  } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
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
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, queryClientConfig)
app.use(createI18n)

app.mount('#app')

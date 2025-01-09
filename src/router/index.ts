// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'

import { config } from '@/config'
const routes = setupLayouts(generatedRoutes)
console.log('routes', routes)
const router = createRouter({
  history: createWebHistory(config.baseUrl),
  routes
})
console.log('router', router)
export default router

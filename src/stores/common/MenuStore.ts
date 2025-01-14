import { HomeOutline, LogOutOutline } from '@vicons/ionicons5'
import { defineStore } from 'pinia'
import type { Component, ComputedRef } from 'vue'

import { DashboardRoutes, Routes } from '@/enums'
  interface Menu {
    label: string
    key: string
    icon: Component
    route?: DashboardRoutes | Routes
    children?: Menu[]
  }

interface MenuStore {
  menu: ComputedRef<Menu[]>
}

export const useMenuStore = defineStore<string, MenuStore>('menuStore', () => {
  //  State
  const state = ref<Menu[]>([
    {
      label: '主頁',
      key: DashboardRoutes.home,
      icon: HomeOutline,
      route: DashboardRoutes.home
    },
    // {
    // 	label: '第二頁',
    // 	key: '第二頁',
    // 	icon: BookOutline,
    // 	children: [
    // 		{
    // 			label: '第二頁裡面',
    // 			key: DashboardRoutes.secondFirst,
    // 			icon: HomeOutline,
    // 			route: DashboardRoutes.secondFirst
    // 		}
    // 	]
    // },
    {
      label: '朋友',
      key: DashboardRoutes.friend,
      icon: HomeOutline,
      route: DashboardRoutes.friend
    },
    {
      label: '個人資料',
      key: DashboardRoutes.profile,
      icon: HomeOutline,
      route: DashboardRoutes.profile
    },
    {
      label: '登出',
      key: Routes.login,
      icon: LogOutOutline,
      route: Routes.login
    }
  ])
  //  Getters

  const menu = computed(() => state.value)
  // Actions

  return {
    menu
  }
})
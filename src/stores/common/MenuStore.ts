import { IdCardOutline, PersonCircleOutline, PeopleOutline } from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { defineStore } from 'pinia'
import type { Component, ComputedRef } from 'vue'
import { markRaw } from 'vue'

import { DashboardRoutes, Routes } from '@/types'
import { renderIcon } from '@/utils'
interface Menu {
  label: string
  key: string
  icon: Component
  route?: DashboardRoutes | Routes
  children?: Menu[]
}

interface MenuStore {
  menu: ComputedRef<MenuOption[]>
}

export const useMenuStore = defineStore<string, MenuStore>('menuStore', () => {
  const router = useRouter()
  // **  State
  const state = ref<Menu[]>([
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
      label: '牧養名單',
      key: DashboardRoutes.sheep,
      icon: markRaw(IdCardOutline),
      route: DashboardRoutes.sheep
    },
    {
      label: '開戶',
      key: DashboardRoutes.createAccount,
      icon: markRaw(PeopleOutline),
      route: DashboardRoutes.createAccount
    },
    {
      label: '個人資料',
      key: DashboardRoutes.profile,
      icon: markRaw(PersonCircleOutline),
      route: DashboardRoutes.profile
    }
  ])

  // 將 menu 轉換為 NaiveUI 的 MenuOption
  const transformToNaiveUIMenu = (menu: Menu[]): MenuOption[] => menu.map(item => {
    const menuItem: MenuOption = {
      label: item.label,
      icon: renderIcon(item.icon),
      key: item.key,
      onClick: item.route ? () => router.push(item.route as any) : undefined
    }

    if (item.children) {
      menuItem.children = transformToNaiveUIMenu(item.children)
    }

    return menuItem
  })
  // **  Getters
  const menu = computed(() => transformToNaiveUIMenu(state.value))
  // Actions

  return {
    menu
  }
})
import { NewspaperOutline, IdCardOutline, PersonCircleOutline, PeopleOutline } from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { defineStore } from 'pinia'
import type { Component, ComputedRef } from 'vue'
import { markRaw } from 'vue'

import { DashboardRoutes, Routes } from '@/enums'
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
    {
      label: '動態牆',
      key: DashboardRoutes.home,
      icon: markRaw(NewspaperOutline),
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
      label: '牧養名單',
      key: DashboardRoutes.sheep,
      icon: markRaw(IdCardOutline),
      route: DashboardRoutes.sheep
    },
    {
      label: '區重點名單',
      key: DashboardRoutes.districtSheep,
      icon: markRaw(PeopleOutline),
      route: DashboardRoutes.districtSheep
    },
    {
      label: '好友',
      key: DashboardRoutes.friend,
      icon: markRaw(PeopleOutline),
      route: DashboardRoutes.friend
    },
    {
      label: '個人資料',
      key: DashboardRoutes.profile,
      icon: markRaw(PersonCircleOutline),
      route: DashboardRoutes.profile
    }
    // {
    //   label: '登出',
    //   key: Routes.login,
    //   icon: markRaw(LogOutOutline),
    //   route: Routes.login
    // }
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
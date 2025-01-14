<script setup lang='ts'>
import { HomeOutline, LogOutOutline } from '@vicons/ionicons5'
import { NLayoutSider, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'

import { DashboardRoutes, Routes } from '@/enums'
import { renderIcon } from '@/utils'
const router = useRouter()
const route = useRoute()

const state = ref({
	menu: {
		selectedKey: route.path
	}
})

interface Menu {
	label: string
	key: string
	icon: Component
	route?: DashboardRoutes | Routes
	children?: Menu[]
}

const menu: Menu[] = [
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
]

const transformMenu = (menu: Menu[]): MenuOption[] =>
	menu.map(item => {
		const menuItem: MenuOption = {
			label: item.label,
			icon: renderIcon(item.icon),
			key: item.key,
			onClick: item.route ? () => router.push(item.route as any) : undefined
		}

		if (item.children) {
			menuItem.children = transformMenu(item.children)
		}

		return menuItem
	})

const menuOptions = transformMenu(menu)

// 監聽路由變化，更新 selectedKey
watch(() => route.path,
	(routePath: string) => {
		const isDashboardSlash = routePath === '/dashboard/' ? DashboardRoutes.home : routePath
		state.value.menu.selectedKey = isDashboardSlash
	}, { immediate: true })

</script>

<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    show-trigger
  >
    <n-menu
      v-model:value="state.menu.selectedKey"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

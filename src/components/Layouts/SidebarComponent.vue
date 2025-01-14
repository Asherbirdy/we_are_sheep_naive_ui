<script setup lang='ts'>
import { NLayoutSider, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
import type { Component } from 'vue'

import { DashboardRoutes, Routes } from '@/enums'
import { useMenuStore } from '@/stores'
import { renderIcon } from '@/utils'

const menuStore = useMenuStore()
const { menu } = storeToRefs(menuStore)
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

const menuOptions = transformMenu(menu.value)

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

<script setup lang='ts'>
import { NLayoutSider, NMenu } from 'naive-ui'
import { storeToRefs } from 'pinia'

import { useMenuStore } from '@/stores'

const menuStore = useMenuStore()
const { menu } = storeToRefs(menuStore)
const route = useRoute()

const state = ref({
	menu: {
		selectedKey: route.path
	}
})

// 監聽路由變化，更新 selectedKey
// watch(() => route.path,
// 	(routePath: string) => {
// 		const isDashboardSlash = routePath === '/dashboard/' ? DashboardRoutes.home : routePath
// 		state.value.menu.selectedKey = isDashboardSlash
// 	}, { immediate: true })

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
      :options="menu"
    />
  </n-layout-sider>
</template>

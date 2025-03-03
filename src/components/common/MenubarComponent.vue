<script setup lang='ts'>
import { useMutation } from '@tanstack/vue-query'
import { Menu2 as MenuIcon } from '@vicons/tabler'
import { NIcon, NDrawer, NDrawerContent, NMenu, NDropdown, NSpace, NButton } from 'naive-ui'
import type { DropdownProps } from 'naive-ui'
import { storeToRefs } from 'pinia'

import LogoutBtnForWebComponent from './LogoutBtnForWebComponent.vue'
import ThemeSwichComponent from './ThemeSwichComponent.vue'
import { useAuthApi } from '@/hook'
import { useMenuStore } from '@/stores'
import { Routes } from '@/types'
import { cookieJs } from '@/utils'

const menuStore = useMenuStore()
const { menu } = storeToRefs(menuStore)
const router = useRouter()
// 狀態
const state = ref({
	data: {
		menuKey: '' // 選中的 menu key
	},
	status: {
		dropdown: false, // 是否顯示 dropdown
		drawer: false // 是否顯示 drawer
	}
})

// 下拉選單選項 網站才會出現
const dropdownOptions = [
	{
		label: 'Theme',
		key: 'Theme'
	},
	{
		label: 'Logout',
		key: 'Logout'
	}
]

// 如果是 theme 顯示 主題 switch 回傳 ThemeSwichComponent組件 其他都傳 label
const dropdownLabel: DropdownProps['renderLabel'] = (dropdownOptions) => {
	switch (dropdownOptions.key) {
		case 'Theme':
			return h(ThemeSwichComponent)
		case 'Logout':
			return h(LogoutBtnForWebComponent)
		default:
			return dropdownOptions.label as string
	}
}

const { mutate: handleLogout } = useMutation({
	mutationFn: () => useAuthApi.logout.api(),
	onSuccess: () => {
		cookieJs.clearToken()
		router.push(Routes.login)
	}
})

</script>

<template>
  <div>
    <!--
			網頁版 menu dropdown
		-->
    <n-dropdown
      :show="state.status.dropdown"
      :options="dropdownOptions"
      placement="bottom-start"
      :render-label="dropdownLabel"
    >
      <n-icon
        class="hidden md:block"
        :size="30"
        color="gray"
        cursor="pointer"
        @click="state.status.dropdown = !state.status.dropdown"
      >
        <MenuIcon />
      </n-icon>
    </n-dropdown>
    <!--
			手機版 menu
		-->
    <n-icon
      :size="30"
      color="gray"
      cursor="pointer"
      class="block md:hidden"
      @click="state.status.drawer = true"
    >
      <MenuIcon />
    </n-icon>
    <!--
			手機版 menu drawer
		-->
    <n-drawer
      v-model:show="state.status.drawer"
      placement="right"
      default-width="180"
    >
      <n-drawer-content
        title="目錄"
        body-content-style="padding: 0;"
      >
        <n-space
          justify="center"
          class="my-2"
        >
          <ThemeSwichComponent />
        </n-space>
        <n-menu
          v-model:value="state.data.menuKey"
          :options="menu"
          :on-update:value="() => state.status.drawer = false"
        />
        <n-space
          justify="center"
          class="my-2"
        >
          <n-button @click="handleLogout()">
            登出
          </n-button>
        </n-space>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

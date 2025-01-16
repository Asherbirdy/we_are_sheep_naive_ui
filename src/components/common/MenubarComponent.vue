<script setup lang='ts'>

import { Menu2 as MenuIcon } from '@vicons/tabler'
import { NIcon, NDrawer, NDrawerContent, NMenu, NDropdown, NSpace } from 'naive-ui'
import type { DropdownProps } from 'naive-ui'
import { storeToRefs } from 'pinia'

import ThemeSwichComponent from './ThemeSwichComponent.vue'
import { useMenuStore } from '@/stores'
const menuStore = useMenuStore()
const { menu } = storeToRefs(menuStore)
const state = ref({
	status: {
		dropdown: false,
		drawer: false
	}
})

const active = ref(false)
const activeKey = ref('')

const dropdownOptions = [
	{
		label: 'Theme',
		key: 'Theme'
	},
	{
		label: '登出',
		key: '登出'
	}
]

// 如果是 theme 顯示 主題 switch 回傳 ThemeSwichComponent組件 其他都傳 label
const dropdownLabel: DropdownProps['renderLabel'] = (dropdownOptions) => {
	switch (dropdownOptions.key) {
		case 'Theme':
			return h(ThemeSwichComponent)
		default:
			return dropdownOptions.label as string
	}
}

</script>

<template>
  <div>
    <!--
			手機版 menu icon
		-->
    <n-icon
      :size="30"
      color="gray"
      cursor="pointer"
      class="block md:hidden"
      @click="active = true"
    >
      <MenuIcon />
    </n-icon>
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
    <n-drawer
      v-model:show="active"
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
          v-model:value="activeKey"
          :options="menu"
        />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

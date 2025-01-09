<script setup lang="ts">
import { Menu2 as MenuIcon } from '@vicons/tabler'
import {
	NLayout,
	NLayoutHeader,
	NImage,
	NSpace,
	NFlex,
	NDropdown,
	NIcon

} from 'naive-ui'
import type { DropdownProps } from 'naive-ui'

import ThemeSwichComponent from '@/components/common/ThemeSwichComponent.vue'

const state = ref({
	dropdown: {
		show: false
	}
})

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
    <n-layout content-style="padding: 24px;">
      <n-layout-header>
        <n-space
          justify="space-between"
          align="center"
        >
          <n-image
            width="150"
            src="https://imageapi.click2.travel/upload/enterpriseLogoImage/43/L1T6T8HLNFA6.png?v=2024-07-02"
          />
          <n-flex
            justify="space-between"
            align="center"
          >
            <LocalePopselectComponent />
            <n-dropdown
              :show="state.dropdown.show"
              :options="dropdownOptions"
              placement="bottom-start"
              :render-label="dropdownLabel"
            >
              <n-icon
                :size="30"
                color="gray"
                cursor="pointer"
                @click="state.dropdown.show = !state.dropdown.show"
              >
                <MenuIcon />
              </n-icon>
            </n-dropdown>
          </n-flex>
        </n-space>
      </n-layout-header>
    </n-layout>
    <n-layout has-sider>
      <SidebarComponent />
      <router-view
        v-slot="{ Component }"
        class="w-full m-4"
        style="height: calc(100dvh - 138px)"
      >
        <transition name="pagefade">
          <component :is="Component" />
        </transition>
      </router-view>
    </n-layout>
  </div>
</template>
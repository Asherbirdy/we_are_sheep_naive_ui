<script setup lang='ts'>
import { Menu2 as MenuIcon } from '@vicons/tabler'
import {
	NLayout,
	NLayoutContent,
	NSpace,
	NDropdown,
	NIcon,
	NP
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
		label: '其他',
		key: 'The其他me'
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
  <n-layout
    content-style="
      padding: 24px;
      margin: auto;
      max-width: 1200px;"
  >
    <n-space
      justify="space-between"
      align="center"
    >
      <n-p>Logo</n-p>
      <n-space align="center">
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
            <MenuIcon mt-2 />
          </n-icon>
        </n-dropdown>
      </n-space>
    </n-space>
    <n-layout>
      <n-layout-content
        content-style="
          height: calc(100dvh - 92px);
          display: flex;
          justify-content: center;
          align-items: center;
          "
      >
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

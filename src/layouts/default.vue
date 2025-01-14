<script setup lang="ts">
import {
	BookOutline as BookIcon,
	PersonOutline as PersonIcon,
	WineOutline as WineIcon
} from '@vicons/ionicons5'
import { Menu2 as MenuIcon } from '@vicons/tabler'
import { NLayout, NLayoutHeader, NSpace, NFlex, NDropdown, NIcon, NP, NDrawer, NDrawerContent, NMenu } from 'naive-ui'
import type { DropdownProps, MenuOption } from 'naive-ui'

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

function renderIcon (icon: Component) {
	return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
	{
		label: 'Hear the Wind Sing',
		key: 'hear-the-wind-sing',
		icon: renderIcon(BookIcon)
	},
	{
		label: 'Pinball 1973',
		key: 'pinball-1973',
		icon: renderIcon(BookIcon),
		disabled: true,
		children: [
			{
				label: 'Rat',
				key: 'rat'
			}
		]
	},
	{
		label: 'A Wild Sheep Chase',
		key: 'a-wild-sheep-chase',
		disabled: true,
		icon: renderIcon(BookIcon)
	},
	{
		label: 'Dance Dance Dance',
		key: 'Dance Dance Dance',
		icon: renderIcon(BookIcon),
		children: [
			{
				type: 'group',
				label: 'People',
				key: 'people',
				children: [
					{
						label: 'Narrator',
						key: 'narrator',
						icon: renderIcon(PersonIcon)
					},
					{
						label: 'Sheep Man',
						key: 'sheep-man',
						icon: renderIcon(PersonIcon)
					}
				]
			},
			{
				label: 'Beverage',
				key: 'beverage',
				icon: renderIcon(WineIcon),
				children: [
					{
						label: 'Whisky',
						key: 'whisky'
					}
				]
			},
			{
				label: 'Food',
				key: 'food',
				children: [
					{
						label: 'Sandwich',
						key: 'sandwich'
					}
				]
			},
			{
				label: 'The past increases. The future recedes.',
				key: 'the-past-increases-the-future-recedes'
			}
		]
	}
]

const activeKey = ref('')
const active = ref(false)
</script>

<template>
  <div>
    <n-layout content-style="padding: 24px;">
      <n-layout-header>
        <n-space
          justify="space-between"
          align="center"
        >
          <n-p width="150">
            LOGO
          </n-p>
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
            <n-icon
              :size="30"
              color="gray"
              cursor="pointer"
              @click="active = true"
            >
              <MenuIcon />
            </n-icon>
          </n-flex>
        </n-space>
      </n-layout-header>
    </n-layout>
    <n-layout has-sider>
      <SidebarComponent class="md:block hidden" />
      <n-space
        vertical
        class="w-full m-4"
      >
        <router-view
          v-slot="{ Component }"
          style="height: calc(100dvh - 114px);"
        >
          <transition
            name="pagefade"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </n-space>
    </n-layout>
    <n-drawer
      v-model:show="active"
      placement="right"
    >
      <n-drawer-content title="Stoner">
        <ThemeSwichComponent />
        <n-menu
          v-model:value="activeKey"
          :root-indent="36"
          :indent="12"
          :options="menuOptions"
        />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
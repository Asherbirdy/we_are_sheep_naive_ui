<script setup lang='ts'>
import {
	BookOutline as BookIcon,
	PersonOutline as PersonIcon,
	WineOutline as WineIcon
} from '@vicons/ionicons5'
import { Menu2 as MenuIcon } from '@vicons/tabler'
import { NIcon, NDrawer, NDrawerContent, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

import { renderIcon } from '@/utils'

const active = ref(false)
const activeKey = ref('')
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
</script>

<template>
  <div>
    <n-icon
      :size="30"
      color="gray"
      cursor="pointer"
      @click="active = true"
    >
      <MenuIcon />
    </n-icon>
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

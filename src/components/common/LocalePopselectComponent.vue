<script setup lang='ts'>
import { EarthOutline as EarthIcon } from '@vicons/ionicons5'
import {
	NPopselect,
	NButton,
	NIcon
} from 'naive-ui'
import { useI18n } from 'vue-i18n'

import { useThemeStore } from '@/stores'
import { i18n } from '@/types'

const themeStore = useThemeStore()
const { handleChangeLocales } = themeStore

const { locale } = useI18n()

interface State {
	status: i18n | null
}

const state = ref<State>({
	status: null
})

// popselect options
const localesOptions = [
	{
		label: '繁體中文',
		value: i18n.zhTW
	},
	{
		label: 'English',
		value: i18n.en
	}
]

// 顯示語系 Label
const displayLocale = computed(() => {
	const selectedOption = localesOptions.find(option => option.value === state.value.status)
	return selectedOption ? selectedOption.label : ''
})

// 更新目前的語系
const initLocale = () => {
	const currentLocale = locale.value as keyof typeof i18n
	state.value.status = i18n[currentLocale] || i18n.zhTW
}

// 監測線現在的語系
watch(() => state.value.status, (newValue) => {
	if (newValue){
		handleChangeLocales(newValue)
	}
})

onMounted(() => initLocale())
</script>

<template>
  <n-popselect
    v-model:value="state.status"
    :options="localesOptions"
    scrollable
  >
    <n-button
      strong
      tertiary
    >
      <template #icon>
        <n-icon>
          <EarthIcon />
        </n-icon>
      </template>
      {{ displayLocale }}
    </n-button>
  </n-popselect>
</template>

<script setup lang='ts'>
import { NSwitch } from 'naive-ui'
import { storeToRefs } from 'pinia'

import { useThemeStore } from '@/stores'

// 主題模式
const themeStore = useThemeStore()
const { getThemeMode } = storeToRefs(themeStore)
const { handleChangeThemeMode } = themeStore

const state = ref({
	switch: {
		themeMode: false
	}
})

const checkThemeMode = () => {
	if (!getThemeMode.value){
		state.value.switch.themeMode = false
		return
	}
	state.value.switch.themeMode = true
}

onMounted(() => checkThemeMode())
</script>

<template>
  <n-switch
    v-model:value="state.switch.themeMode"
    @update:value="handleChangeThemeMode()"
  >
    <template #checked>
      暗色模式
    </template>
    <template #unchecked>
      一般模式
    </template>
  </n-switch>
</template>

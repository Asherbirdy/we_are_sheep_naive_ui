<script setup lang="ts">
import {
	NConfigProvider,
	NMessageProvider,
	NModalProvider,
	NDialogProvider,
	NNotificationProvider
} from 'naive-ui'
import { storeToRefs } from 'pinia'

import { useThemeStore } from '@/stores'
import themeOverides from '@/theme'

// 主題模式
const themeStore = useThemeStore()
const { getThemeMode } = storeToRefs(themeStore)
const { handleSetupThemeMode, handleSetupLocales } = themeStore

// 引入主題色
onMounted(() => {
	handleSetupThemeMode()
	handleSetupLocales()
})
</script>
<template>
  <n-config-provider
    :theme-overrides="themeOverides"
    :theme="getThemeMode"
  >
    <n-notification-provider>
      <n-dialog-provider>
        <n-modal-provider>
          <n-message-provider>
            <RouterView />
          </n-message-provider>
        </n-modal-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

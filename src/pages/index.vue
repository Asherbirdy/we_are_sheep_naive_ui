<route lang="yaml">
  name: 'Index'
  meta:
    layout: login
</route>

<script setup lang='ts'>
import {
	NSpace,
	NImage,
	NCard,
	NTabPane,
	NTabs
} from 'naive-ui'
import { useI18n } from 'vue-i18n'

import WelcomeImage from '@/assets/image/login/welcome.png'

const { t } = useI18n()

</script>

<template>
  <n-space
    mt-15
    justify="center"
    align="center"
  >
    <n-image
      class="md:block hidden"
      width="400"
      :src="WelcomeImage"
    />
    <n-card :title="t('login.title')">
      <n-tabs
        class="w-350px h-400px px-2"
        default-value="登入"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane
          name="登入"
          tab="登入"
        >
          <LoginFormComponent />
        </n-tab-pane>
        <n-tab-pane
          name="註冊"
          tab="註冊"
        >
          <SignUpComponent />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>

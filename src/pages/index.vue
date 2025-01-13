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
    justify="center"
    align="center"
  >
    <n-image
      class="lg:block hidden"
      width="400"
      :src="WelcomeImage"
    />
    <n-card :title="t('login.title')">
      <n-tabs
        class="w-250px md:w-450px md:h-450px"
        default-value="登入"
        size="large"
        animated
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

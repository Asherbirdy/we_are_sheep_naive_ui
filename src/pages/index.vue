<route lang="yaml">
  name: 'Index'
  meta:
    layout: login
</route>

<script setup lang='ts'>
import { NSpace, NImage, NCard, NTabPane, NTabs } from 'naive-ui'
import { useI18n } from 'vue-i18n'

import WelcomeImage from '@/assets/image/login/welcome.png'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
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
    <n-card title="登入">
      <n-tabs
        class="w-full md:w-450px"
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

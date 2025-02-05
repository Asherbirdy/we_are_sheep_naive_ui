<route lang="yaml">
  name: 'Index'
  meta:
    layout: login
</route>

<script setup lang='ts'>
import { NSpace, NImage, NCard, NTabPane, NTabs } from 'naive-ui'
import { useI18n } from 'vue-i18n'

import WelcomeImage from '@/assets/image/login/welcome.png'
import { DashboardRoutes } from '@/enums'
import { useAuthApi } from '@/hook'
const router = useRouter()
// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
const { t } = useI18n()

const init = async () => {
	const res = await useAuthApi.checkValidToken.api()
	if (res.msg === 'Token is valid') {
		router.push(DashboardRoutes.sheep)
	}
}

onMounted(() => init())
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

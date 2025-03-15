<route lang="yaml">
  name: 'Index'
  meta:
    layout: login
</route>

<script setup lang='ts'>
import { NSpace, NImage, NCard, NTabs, NTabPane } from 'naive-ui'
import { useI18n } from 'vue-i18n'

import WelcomeImage from '@/assets/image/login/welcome.png'
import { useAuthApi } from '@/hook'
import { DashboardRoutes } from '@/types'
const router = useRouter()
const route = useRoute()
// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
const { t } = useI18n()

enum Tab {
	login = '登入',
	register = '註冊'
}

const state = ref({
	data: {
		tab: Tab.login
	},
	tabs: [Tab.login, Tab.register]
})

const init = async () => {
	if (route.query.tab === Tab.register) {
		state.value.data.tab = Tab.register
		return
	}
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
    <n-card>
      <n-tabs
        v-model:value="state.data.tab"
        class="w-full md:w-450px"
        size="large"
        animated
      >
        <n-tab-pane
          :name="Tab.login"
          tab="登入"
        >
          <LoginFormComponent />
        </n-tab-pane>
        <n-tab-pane
          :name="Tab.register"
          tab="註冊"
        >
          <SignUpComponent />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>

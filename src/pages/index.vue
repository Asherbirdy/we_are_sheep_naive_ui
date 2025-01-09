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
	NForm,
	NFormItem,
	NInput,
	NButton,
	NTabPane,
	NTabs
} from 'naive-ui'
import type {
	FormInst,
	FormRules
} from 'naive-ui'
import { useI18n } from 'vue-i18n'

import WelcomeImage from '@/assets/image/login/welcome.png'
import { DashboardRoutes } from '@/enums'

const { t } = useI18n()
const router = useRouter()
const formRef = ref<FormInst | null>(null)

const state = ref({
	loginForm: {
		username: null,
		password: null
	},
	subitmitButton: {
		loading: false,
		disabled: true
	}
})

const rules: FormRules = {
	username: [
		{
			required: true,
			message: '請輸入帳號',
			trigger: ['input', 'blur']
		}
	],
	password: [
		{
			required: true,
			message: '請輸入密碼',
			trigger: ['input', 'blur']
		}
	]
}

console.log(t('login.title'))

const handleLogin = () => {
	router.push(DashboardRoutes.home)
}

watchEffect(() => {
	const checkForm = (
		state.value.loginForm.username &&
		state.value.loginForm.password
	)
	state.value.subitmitButton.disabled = !checkForm
})
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
        class="min-w-300px h-400px px-2"
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
          <n-form
            ref="formRef"
            :model="state.loginForm"
            :rules="rules"
          >
            <n-form-item
              path="username"
              label="帳號"
            >
              <n-input
                v-model:value="state.loginForm.username"
                placeholder="請輸入帳號"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item
              path="password"
              label="密碼"
              class="mb-20"
            >
              <n-input
                v-model:value="state.loginForm.password"
                type="password"
                placeholder="請輸入密碼"
              />
            </n-form-item>
            <n-space justify="end">
              <n-button
                round
                type="primary"
                :disabled="state.subitmitButton.disabled"
                @click="handleLogin"
              >
                登入
              </n-button>
            </n-space>
          </n-form>
        </n-tab-pane>
        <n-tab-pane
          name="註冊"
          tab="註冊"
        >
          2
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>

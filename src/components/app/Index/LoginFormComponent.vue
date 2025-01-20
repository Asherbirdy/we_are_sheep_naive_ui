<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { NSpace, NForm, NFormItem, NInput, NButton, NA, NPopover, NP } from 'naive-ui'
import type { FormRules } from 'naive-ui'

import { CookieEnum, ClientRoutes } from '@/enums'
import { useAuthApi, useUserApi } from '@/hook'
import { useUserStore } from '@/stores/common/UserStore'
import type { LoginResponse } from '@/types'
import { regex, setToken } from '@/utils'

enum FormKey {
	email = 'email',
	password = 'password'
}

const router = useRouter()
const userStore = useUserStore()
const notification = useNotification()

/*
	* 表單資料
*/
const state = ref({
	data: {
		[FormKey.email]: '',
		[FormKey.password]: ''
	},
	loading: {
		submit: false
	},
	disabled: {
		submit: true
	}
})

/*
	* 表單驗證規則
*/
const rules: FormRules = {
	[FormKey.email]: [
		{
			required: true,
			message: '請輸入帳號',
			trigger: ['input', 'blur']
		},
		{
			validator: (rule, value) => regex.email.test(value),
			message: '請輸入有效的電子信箱格式',
			trigger: ['blur']
		}
	],
	[FormKey.password]: [
		{
			required: true,
			message: '請輸入密碼',
			trigger: ['input', 'blur']
		}
	]
}

/*
  * Login api
*/
const { mutate, isPending } = useMutation({
	mutationFn: async () => await useAuthApi.login({
		email: state.value.data.email,
		password: state.value.data.password
	}),
	onSuccess: async (data: LoginResponse) => {
		// 存 token
		setToken(CookieEnum.accessToken, data.token.accessTokenJWT)
		setToken(CookieEnum.refreshToken, data.token.refreshTokenJWT)

		// 存使用者資料
		const response = await useUserApi.showMe()
		userStore.setUser(response.user)

		await new Promise(resolve => setTimeout(resolve, 4000))
		// 如果未驗證 跳到 profile
		if (!response.user.emailVerified) {
			router.push(ClientRoutes.profile)
			return
		}
		router.push(ClientRoutes.home)
	},
	onError: async () => {
		const { data } = state.value
		await new Promise(resolve => setTimeout(resolve, 2000))
		notification.error({
			title: '登入失敗',
			content: '帳號或密碼錯誤'
		})
		data.password = ''
		data.email = ''
	}
})

/*
  * 監聽表單資料 來決定是否 disabled 登入按鈕
*/
watch(state.value.data, (newVal) => {
	const check = Boolean(
		newVal.email &&
			newVal.password &&
			regex.email.test(newVal.email)
	)
	state.value.disabled.submit = !check
})

</script>
<template>
  <n-form
    ref="formRef"
    :model="state.data"
    :rules="rules"
  >
    <n-form-item
      :path="FormKey.email"
      label="帳號"
    >
      <n-input
        v-model:value="state.data[FormKey.email]"
        placeholder="請輸入帳號"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-form-item
      :path="FormKey.password"
      label="密碼"
      class="mb-20"
    >
      <n-input
        v-model:value="state.data[FormKey.password]"
        type="password"
        placeholder="請輸入密碼"
      />
    </n-form-item>
    <n-space
      justify="space-between"
      align="baseline"
    >
      <n-popover trigger="hover">
        <template #trigger>
          <n-a>
            忘記密碼
          </n-a>
        </template>
        <n-p>
          聯絡開發者並給他您帳號的Email，<br>
          他幫您處理
        </n-p>
      </n-popover>

      <n-button
        round
        type="primary"
        :loading="isPending"
        :disabled="state.disabled.submit"
        @click="mutate()"
      >
        登入
      </n-button>
    </n-space>
  </n-form>
</template>

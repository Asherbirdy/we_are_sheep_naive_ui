<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { NSpace, NForm, NFormItem, NInput, NButton } from 'naive-ui'
import type { FormRules } from 'naive-ui'

import { CookieEnum, DashboardRoutes } from '@/enums'
import { useAuthApi, useUserApi } from '@/hook'
import { useUserStore } from '@/stores'
import type { UserRegisterResponse } from '@/types'
import { regex, setToken } from '@/utils'

const router = useRouter()
const userStore = useUserStore()
const notification = useNotification()

/*
	* 表單資料名稱
*/
enum FormKey {
	name = 'name',
	email = 'email',
	password = 'password',
	confirmPassword = 'confirmPassword',
	serialNumber = 'serialNumber'
}

/*
	* 頁面資料
*/
const state = ref({
	data: {
		[FormKey.name]: '',
		[FormKey.email]: '',
		[FormKey.password]: '',
		[FormKey.confirmPassword]: '',
		[FormKey.serialNumber]: ''
	},
	disabled: {
		signUp: true
	}
})

/*
	* 表單驗證規則
*/
const rules: FormRules = {
	[FormKey.name]: [
		{
			required: true,
			message: '請輸入帳號',
			trigger: ['input', 'blur']
		}
	],
	[FormKey.email]: [
		{
			required: true,
			message: '電子信箱為必填項目',
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
	],
	[FormKey.confirmPassword]: [
		{
			required: true,
			message: '請再次輸入密碼',
			trigger: ['input', 'blur']
		},
		{
			validator: (rule, value) => value === state.value.data.password,
			message: '密碼不一致',
			trigger: ['input', 'blur']
		}
	],
	[FormKey.serialNumber]: [
		{
			required: true,
			message: '請輸入序號',
			trigger: ['input', 'blur']
		}
	]
}

/*
	* 註冊API
*/
const { mutate, isPending } = useMutation({
	mutationFn: () => useAuthApi.userRegister.api({
		name: state.value.data[FormKey.name],
		email: state.value.data[FormKey.email],
		password: state.value.data[FormKey.password],
		serialNumber: state.value.data[FormKey.serialNumber]
	}),
	onSuccess: async (data: UserRegisterResponse) => {
		// 存 token
		setToken(CookieEnum.accessToken, data.token.accessTokenJWT)
		setToken(CookieEnum.refreshToken, data.token.refreshTokenJWT)

		// 存使用者資料
		const response = await useUserApi.showMe()
		userStore.setUser(response.user)

		await new Promise(resolve => setTimeout(resolve, 4000))
		router.push(DashboardRoutes.profile)
	},
	onError: async () => {
		notification.error({
			title: '註冊失敗',
			content: '請輸入正確的資料'
		})
	}
})

/*
	* 按鈕是否可點擊(disabled)
*/
watch(state.value.data, (newVal) => {
	const check = Boolean(
		newVal.name &&
			newVal.email &&
			newVal.password &&
			newVal.confirmPassword &&
			newVal.serialNumber &&
			regex.email.test(newVal.email) &&
			newVal.password === newVal.confirmPassword
	)
	state.value.disabled.signUp = !check
})

</script>
<template>
  <n-form
    ref="formRef"
    :model="state.data"
    :rules="rules"
  >
    <n-form-item
      :path="FormKey.name"
      label="姓名"
    >
      <n-input
        v-model:value="state.data.name"
        placeholder="請輸入姓名"
      />
    </n-form-item>
    <n-form-item
      :path="FormKey.email"
      label="電子信箱"
    >
      <n-input
        v-model:value="state.data.email"
        placeholder="請輸入電子信箱"
      />
    </n-form-item>
    <n-form-item
      :path="FormKey.password"
      label="密碼"
    >
      <n-input
        v-model:value="state.data.password"
        type="password"
        placeholder="請輸入密碼"
      />
    </n-form-item>
    <n-form-item
      :path="FormKey.confirmPassword"
      label="確認密碼"
    >
      <n-input
        v-model:value="state.data.confirmPassword"
        type="password"
        placeholder="請再次輸入密碼"
      />
    </n-form-item>
    <n-form-item
      :path="FormKey.serialNumber"
      label="序號"
    >
      <n-input
        v-model:value="state.data.serialNumber"
        placeholder="請輸入序號"
      />
    </n-form-item>
    <n-space justify="end">
      <n-button
        round
        type="primary"
        :disabled="state.disabled.signUp"
        :loading="isPending"
        @click="mutate()"
      >
        註冊
      </n-button>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import {
	NSpace, NForm, NFormItem, NInput, NButton
} from 'naive-ui'
import type {
	FormRules
} from 'naive-ui'

import { CookieEnum, DashboardRoutes } from '@/enums'
import { useAuthApi, useUserApi } from '@/hook'
import { useUserStore } from '@/stores/common/UserStore'
import type { LoginResponse } from '@/types'
import { setToken } from '@/utils'
enum FormKey {
	email = 'email',
	password = 'password'
}

const userStore = useUserStore()
const router = useRouter()
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

const rules: FormRules = {
	[FormKey.email]: [{
		required: true,
		message: '請輸入帳號',
		trigger: ['input', 'blur']
	}],
	[FormKey.password]: [{
		required: true,
		message: '請輸入密碼',
		trigger: ['input', 'blur']
	}]
}

/*
  * Login api
*/
const { mutate, isPending } = useMutation({
	mutationFn: () => useAuthApi.login({
		email: state.value.data.email,
		password: state.value.data.password
	}),
	onSuccess: async (data: LoginResponse) => {
		setToken(CookieEnum.accessToken, data.token.accessTokenJWT)
		setToken(CookieEnum.refreshToken, data.token.refreshTokenJWT)

		const response = await useUserApi.showMe()
		userStore.setUser(response.user)

		await new Promise(resolve => setTimeout(resolve, 2000))
		router.push(DashboardRoutes.home)
	}
})

/*
  * 監聽表單資料 來決定是否 disabled 登入按鈕
*/
watch(state.value.data, (newVal) => {
	const check = Boolean(newVal.email &&	newVal.password)
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
    <n-space justify="end">
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

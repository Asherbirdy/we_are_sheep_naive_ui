<script setup lang="ts">
import {
	NSpace, NForm, NFormItem, NInput, NButton
} from 'naive-ui'
import type {
	FormRules
} from 'naive-ui'

import { useAuthApi } from '@/hook/apis/useAuthApi'

enum FormKey {
	email = 'email',
	password = 'password'
}

const state = ref({
	data: {
		[FormKey.email]: '',
		[FormKey.password]: ''
	},
	loading: {
		submit: false
	}
})

const rules: FormRules = {
	[FormKey.email]: [
		{
			required: true,
			message: '請輸入帳號',
			trigger: ['input', 'blur']
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

const handleLogin = async () => {
	const { data, loading } = state.value
	loading.submit = true
	try {
		const res = await useAuthApi.login({
			email: data.email,
			password: data.password
		})
		console.log(res)
	} catch (error) {
		console.error(error)
	} finally {
		loading.submit = false
	}
}
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
        v-model:value="state.data.email"
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
        v-model:value="state.data.password"
        type="password"
        placeholder="請輸入密碼"
      />
    </n-form-item>
    <n-space justify="end">
      <n-button
        round
        type="primary"
        @click="handleLogin"
      >
        登入
      </n-button>
    </n-space>
  </n-form>
</template>

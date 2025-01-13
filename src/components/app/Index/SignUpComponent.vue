<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import {
	NSpace, NForm, NFormItem, NInput, NButton
} from 'naive-ui'
import type {
	FormRules
} from 'naive-ui'

import { useAuthApi } from '@/hook'
import { regex } from '@/utils'

enum FormKey {
	name = 'name',
	email = 'email',
	password = 'password',
	confirmPassword = 'confirmPassword',
	serialNumber = 'serialNumber'
}

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
			trigger: ['input', 'blur']
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

const handleSignUp = () => {
	console.log('handleSignUp')
}

const { mutate, isPending } = useMutation({
	mutationFn: () => useAuthApi.userRegister({
		name: state.value.data.name,
		email: state.value.data.email,
		password: state.value.data.password,
		serialNumber: state.value.data.serialNumber
	}),
	onSuccess: async (data: any) => {
		console.log('data', data)
	},
	onError: async (error, variables, context) => {
		console.log('error', error)
	},
	onSettled: (data, error, variables, context) => {
		console.log('data', data)
		console.log('error', error)
		console.log('variables', variables)
		console.log('context', context)
	}
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
        @click="handleSignUp"
      >
        註冊
      </n-button>
    </n-space>
  </n-form>
</template>

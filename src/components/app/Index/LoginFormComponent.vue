<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import {
	NSpace, NForm, NFormItem, NInput, NButton
} from 'naive-ui'
import type {
	FormRules
} from 'naive-ui'

import { useAuthApi } from '@/hook'
import type { LoginResponse } from '@/types'
import { setToken } from '@/utils'

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
	onSuccess: (data: LoginResponse) => {
		setToken('accessToken', data.token.accessTokenJWT)
		setToken('refreshToken', data.token.accessTokenJWT)
	}
})

// })
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
        @click="mutate()"
      >
        登入
      </n-button>
    </n-space>
  </n-form>
</template>

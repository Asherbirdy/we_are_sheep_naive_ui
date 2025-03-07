<route lang="yaml">
  name: 'Index'
  meta:
    layout: login
</route>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { NSpace, NForm, NFormItem, NInput, NButton, NH3 } from 'naive-ui'
import type { FormRules } from 'naive-ui'

import { regex } from '@/utils'

enum FormKey {
	email = 'email',
	newPassword = 'newPassword',
	newPasswordConfirm = 'newPasswordConfirm',
	OTP = 'OTP'
}

const isMobile = useMediaQuery('(max-width: 768px)')

const router = useRouter()
const notification = useNotification()

/*
	* 表單資料
*/
const state = ref({
	data: {
		[FormKey.email]: '',
		[FormKey.newPassword]: '',
		[FormKey.newPasswordConfirm]: '',
		[FormKey.OTP]: ''
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
	[FormKey.newPassword]: [
		{
			required: true,
			message: '請輸入密碼',
			trigger: ['input', 'blur']
		},
		{
			required: true,
			validator: (_, value) => value.length >= 8,
			message: '密碼長度至少8個字',
			trigger: ['input', 'blur']
		}
	],
	[FormKey.newPasswordConfirm]: [
		{
			required: true,
			validator: (rule, value) => value === state.value.data[FormKey.newPassword],
			message: '密碼不一致',
			trigger: ['input', 'blur']
		}
	]
}

/*
  * 監聽表單資料 來決定是否 disabled 登入按鈕
*/
watch(state.value.data, (newVal) => {
	const check = Boolean(
		newVal.email &&
			regex.email.test(newVal.email)
	)
	state.value.disabled.submit = !check
})

</script>
<template>
  <div>
    <n-h3>
      忘記密碼
    </n-h3>
    <n-form
      ref="formRef"
      :label-width="80"
      :model="state.data"
      :rules="rules"
      :style="{ width: isMobile ? '100%' : '400px' }"
    >
      <n-form-item
        :path="FormKey.email"
        label="電子信箱"
      >
        <n-input
          v-model:value="state.data[FormKey.email]"
          placeholder="請輸入電子信箱"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item
        :path="FormKey.newPassword"
        label="新密碼"
      >
        <n-input
          v-model:value="state.data[FormKey.newPassword]"
          type="password"
          placeholder="請輸入新密碼"
        />
      </n-form-item>
      <n-form-item
        :path="FormKey.newPasswordConfirm"
        label="確認新密碼"
      >
        <n-input
          v-model:value="state.data[FormKey.newPasswordConfirm]"
          type="password"
          placeholder="請輸入確認新密碼"
        />
      </n-form-item>
      <n-form-item
        :path="FormKey.OTP"
        label="驗證碼"
        class="mb-20"
      >
        <n-input
          v-model:value="state.data[FormKey.OTP]"
          type="password"
          placeholder="請輸入驗證碼"
        />
      </n-form-item>
      <n-space
        justify="space-between"
        align="baseline"
      >
        <n-button
          round
          type="primary"
          :disabled="state.disabled.submit"
        >
          確認
        </n-button>
      </n-space>
    </n-form>
  </div>
</template>

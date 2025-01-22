<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { AxiosError } from 'axios'
import type { FormInst, FormRules } from 'naive-ui'
import { NButton, NDrawer, NDrawerContent, NTabs, NTabPane, NForm, NFormItem, NInput } from 'naive-ui'

import { useUserApi } from '@/hook/useUserApi'
enum FormKey {
	currentPassword = 'currentPassword',
	newPassword = 'newPassword',
	reenteredNewPassword = 'reenteredNewPassword'
}
const formRef = ref<FormInst | null>(null)
const message = useMessage()
// 表單資料
const state = ref({
	data: {
		changePassword: {
			[FormKey.currentPassword]: '',
			[FormKey.newPassword]: '',
			[FormKey.reenteredNewPassword]: ''
		}
	},
	status: {
		drawer: false
	},
	disabled: {
		updatePasswordBtn: true
	}
})

// 表單驗證規則
const rules: FormRules = {
	[FormKey.currentPassword]: [
		{
			required: true,
			message: 'Password is required'
		}
	],
	[FormKey.newPassword]: [
		{
			required: true,
			message: '新密碼是必填的',
			trigger: ['input', 'blur']
		}
	],
	[FormKey.reenteredNewPassword]: [
		{
			required: true,
			message: '確認新密碼是必填的',
			trigger: ['input', 'blur']
		},
		{
			message: '新密碼與確認新密碼不一致!',
			trigger: ['input', 'blur'],
			validator: () => {
				return state.value.data.changePassword.newPassword === state.value.data.changePassword.reenteredNewPassword
			}
		}
	]
}

interface UpdatePasswordResponse {
	msg: string
}

const { mutate: handleUpdatePassword, isPending } = useMutation({
	mutationFn: async () => await useUserApi.updatePassword({
		oldPassword: state.value.data.changePassword.currentPassword,
		newPassword: state.value.data.changePassword.newPassword
	}),
	onSuccess: async (data) => {
		if ((data as UpdatePasswordResponse).msg === 'Sucess! Password Updated') {
			message.success('更新密碼成功')
			return
		}

		if (data instanceof AxiosError && (
			data.response?.status === 400 ||
			data.response?.status === 403 ||
			data.response?.status === 401
		)) {
			message.error('更新密碼失敗')
		}
	}
})

watch(state.value.data.changePassword, () => {
	const { data } = state.value
	const check = Boolean(
		data.changePassword.currentPassword &&
			data.changePassword.newPassword &&
			data.changePassword.reenteredNewPassword &&
			data.changePassword.reenteredNewPassword === data.changePassword.newPassword
	)

	state.value.disabled.updatePasswordBtn = !check
})
</script>

<template>
  <div>
    <n-button
      type="primary"
      strong
      block
      @click="state.status.drawer = true"
    >
      編輯個人資料
    </n-button>
    <n-drawer
      v-model:show="state.status.drawer"
      :width="502"
      :height="500"
      placement="bottom"
    >
      <n-drawer-content title="Stoner">
        <n-tabs
          type="segment"
          animated
        >
          <n-tab-pane
            name="profile"
            tab="更改個人資料"
          >
            開發中...
          </n-tab-pane>
          <n-tab-pane
            name="password"
            tab="更改密碼"
          >
            <n-form
              ref="formRef"
              :model="state.data.changePassword"
              :rules="rules"
            >
              <n-form-item
                :path="FormKey.currentPassword"
                label="現在密碼"
              >
                <n-input
                  v-model:value="state.data.changePassword.currentPassword"
                  type="password"
                  show-password-on="click"
                  @keydown.enter.prevent
                />
              </n-form-item>
              <n-form-item
                :path="FormKey.newPassword"
                label="新密碼"
              >
                <n-input
                  v-model:value="state.data.changePassword.newPassword"
                  type="password"
                  show-password-on="click"
                  @keydown.enter.prevent
                />
              </n-form-item>
              <n-form-item
                :path="FormKey.reenteredNewPassword"
                label="確認新密碼"
              >
                <n-input
                  v-model:value="state.data.changePassword.reenteredNewPassword"
                  type="password"
                  show-password-on="click"
                  @keydown.enter.prevent
                />
              </n-form-item>
              <n-button
                round
                type="primary"
                :disabled="state.disabled.updatePasswordBtn"
                :loading="isPending"
                @click="handleUpdatePassword()"
              >
                更新密碼
              </n-button>
            </n-form>
          </n-tab-pane>
        </n-tabs>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

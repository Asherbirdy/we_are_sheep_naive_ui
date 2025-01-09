<script setup lang="ts">
import {
	NSpace, NForm, NFormItem, NInput, NButton
} from 'naive-ui'
import type {
	FormRules
} from 'naive-ui'

const state = ref({
	data: {
		username: null,
		password: null
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

const handleLogin = () => {
	console.log('handleLogin')
}
</script>
<template>
  <n-form
    ref="formRef"
    :model="state.data"
    :rules="rules"
  >
    <n-form-item
      path="username"
      label="帳號"
    >
      <n-input
        v-model:value="state.data.username"
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

<script setup lang="ts">
import {
	NSpace, NForm, NFormItem, NInput, NButton
} from 'naive-ui'
import type {
	FormRules
} from 'naive-ui'

const state = ref({
	data: {
		name: '',
		email: null,
		password: null,
		serialNumber: ''
	}
})

const rules: FormRules = {
	name: [
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
      path="password"
      label="電子信箱 / 姓名"
    >
      <n-input
        :style="{ width: '70%' }"
        placeholder="請輸入電子信箱"
      />
      <n-input
        :style="{ width: '30%' }"
        placeholder="請輸入姓名"
      />
    </n-form-item>
    <n-input-group>
    </n-input-group>
    <n-form-item
      path="password"
      label="密碼"
    >
      <n-input
        v-model:value="state.data.password"
        type="password"
        placeholder="請輸入密碼"
      />
    </n-form-item>
    <n-form-item
      path="password"
      label="序號"
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
        註冊
      </n-button>
    </n-space>
  </n-form>
</template>

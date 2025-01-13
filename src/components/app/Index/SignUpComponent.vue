<script setup lang="ts">
import {
	NSpace, NForm, NFormItem, NInput, NButton
} from 'naive-ui'
import type {
	FormRules
} from 'naive-ui'

enum FormKey {
	name = 'name',
	email = 'email',
	password = 'password',
	serialNumber = 'serialNumber'
}

const state = ref({
	data: {
		[FormKey.name]: '',
		[FormKey.email]: '',
		[FormKey.password]: '',
		[FormKey.serialNumber]: ''
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
	[FormKey.password]: [
		{
			required: true,
			message: '請輸入密碼',
			trigger: ['input', 'blur']
		}
	]
}

const handleSignUp = () => {
	console.log('handleSignUp')
}
</script>
<template>
  <n-form
    ref="formRef"
    :model="state.data"
    :rules="rules"
  >
    <n-form-item
      path="name"
      label="姓名"
    >
      <n-input
        placeholder="請輸入姓名"
      />
    </n-form-item>
    <n-form-item
      path="email"
      label="電子信箱 / 姓名"
    >
      <n-input

        placeholder="請輸入電子信箱"
      />
    </n-form-item>
    <!-- </n-form-item> -->
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
        @click="handleSignUp"
      >
        註冊
      </n-button>
    </n-space>
  </n-form>
</template>

<script setup lang='ts'>
import { useMutation, useQuery } from '@tanstack/vue-query'
import { NCard, NButton, NSpace, NInput, NInputGroup, NText } from 'naive-ui'

import EmailVerifyComponent from '@/components/app/dashboard/profile/EmailVerifyComponent.vue'
import { Routes } from '@/enums'
import { useAuthApi } from '@/hook'
import { useUserApi } from '@/hook'
import { clearToken } from '@/utils'

const { data: getUser } = useQuery({
	queryKey: [useUserApi.showMe.queryKey],
	queryFn: () => useUserApi.showMe.api()
})

const router = useRouter()
const dialog = useDialog()
const notification = useNotification()

enum Page {
	emailVerify = 'emailVerify',
	emailAlreadyVerify = 'emailAlreadyVerify'
}

const state = ref({
	data: {
		verifyCode: ''
	},
	page: {
		current: Page.emailVerify
	},
	disabled: {
		emailVerify: true
	}
})

watch(state.value.data, (newVal) => {
	const check = Boolean(newVal.verifyCode)
	state.value.disabled.emailVerify = !check
})

const checkEmailVerify = async () => {
	if (getUser.value?.user?.emailVerified) {
		state.value.page.current = Page.emailAlreadyVerify
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { mutate, isPending } = useMutation({
	mutationFn: async () => await useAuthApi.verifyEmail.api({
		OTP: state.value.data.verifyCode
	}),
	onSuccess: () => {
		clearToken()
		// 打開 modal 並回首頁 登入 清掉 token
		dialog.success({
			title: '綁定成功',
			content: '再請回首頁重新登入',
			positiveText: '回首頁',
			closable: false,
			onPositiveClick: () => {
				clearToken()
				router.push(Routes.login)
			}
		})
	},
	onError: () => {
		state.value.data.verifyCode = ''
		notification.error({
			title: '驗證失敗',
			content: '請重新輸入驗證碼',
			duration: 3000
		})
	}
})

onMounted(() => checkEmailVerify())
</script>

<template>
  <div class="flex justify-center items-center">
    <n-space
      vertical
      justify="center"
    >
      <!--
        驗證Email
      -->
      <n-card
        v-if="state.page.current === Page.emailVerify"
        title="驗證Email"
        class="min-w-[290px]"
      >
        <n-text>
          {{ `請點擊「傳送驗證碼」，並前往您的Email信箱${getUser?.user?.email}，輸入驗證碼以完成驗證。` }}
        </n-text>
        <n-input-group class="mt-2">
          <n-input
            v-model:value="state.data.verifyCode"
            placeholder="請輸入驗證碼"
          />
          <EmailVerifyComponent />
        </n-input-group>
        <template #action>
          <n-button
            block
            type="primary"
            :disabled="state.disabled.emailVerify"
            :loading="isPending"
            @click="mutate()"
          >
            驗證
          </n-button>
        </template>
      </n-card>
      <!--
        已驗證Email
      -->
      <n-card
        v-else
        title="Email已驗證"
        class="min-w-[290px]"
      >
        <n-text>
          {{ `${getUser?.user?.email}已驗證成功。` }}
        </n-text>
        <n-button
          class="mt-2"
          block
          type="primary"
          @click="router.back()"
        >
          返回
        </n-button>
      </n-card>
    </n-space>
  </div>
</template>

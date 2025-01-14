<script setup lang='ts'>
import { NCard, NButton, NSpace, NInput, NInputGroup, NText } from 'naive-ui'
import { storeToRefs } from 'pinia'

import EmailVerifyComponent from '@/components/app/dashboard/profile/EmailVerifyComponent.vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const { getUser } = storeToRefs(userStore)

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
	}
})

const router = useRouter()

onMounted(() => {
	console.log(getUser.value)

	if (getUser.value?.email) {
		state.value.page.current = Page.emailAlreadyVerify
	}

})
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
          {{ `請前往您的Email信箱${getUser?.email}，輸入驗證碼以完成驗證。` }}
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
          {{ `${getUser?.email}已驗證成功。` }}
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

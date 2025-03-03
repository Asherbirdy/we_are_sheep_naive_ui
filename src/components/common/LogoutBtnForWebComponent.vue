<script setup lang='ts'>
import { useMutation } from '@tanstack/vue-query'
import { NButton } from 'naive-ui'

import { useAuthApi } from '@/hook'
import { Routes } from '@/types'
import { cookieJs } from '@/utils'
const router = useRouter()

const { mutate: handleLogout } = useMutation({
	mutationFn: () => useAuthApi.logout.api(),
	onSuccess: () => {
		cookieJs.clearToken()
		router.push(Routes.login)
	}
})
</script>

<template>
  <n-button @click="handleLogout()">
    登出
  </n-button>
</template>

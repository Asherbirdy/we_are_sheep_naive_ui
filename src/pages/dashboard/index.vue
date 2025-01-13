<script setup lang='ts'>

import { useQuery } from '@tanstack/vue-query'

import { useUserApi } from '@/hook'
import type { UserInfoData } from '@/types'

const state = ref({
	data: null as UserInfoData | null
})

onMounted(async () => {
	const response = await useUserApi.show()
	state.value.data = response.user
})

const { data } = useQuery({
	queryKey: ['user'],
	queryFn: () => useUserApi.show()
})
</script>

<template>
  <div>{{ data }}</div>
</template>

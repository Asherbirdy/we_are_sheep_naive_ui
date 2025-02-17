<route lang="yaml">
  name: 'teenMeetingAttend'
  meta:
    layout: login
</route>
<script setup lang='ts'>
import { useMutation } from '@tanstack/vue-query'
import { NCard, NInput, NButton } from 'naive-ui'

import { useTeenMeetingAttendApi } from '@/hook'

enum Page {
	password = 'password',
	dataPage = 'dataPage',
}

const message = useMessage()

const state = ref(
	{
		api: {
			getTeenMeetingAttend: null
		},
		data: {
			password: ''
		},
		current: {
			page: Page.password
		},
		isDisabled: true
	}
)

const { mutate: handleGetTeenMeetingAttend, isPending } = useMutation({
	mutationFn: () => useTeenMeetingAttendApi.get({ password: state.value.data.password }),
	onSuccess: (data) => {

		if (data?.response?.status === 401) {
			message.error('密碼錯誤')
			return
		}

		state.value.current.page = Page.dataPage
		state.value.api.getTeenMeetingAttend = data
		console.log('state.value.api.getTeenMeetingAttend', state.value.api.getTeenMeetingAttend)
	}
})

watch(state.value.data, (val) => {
	if (val.password.length >= 3) {
		state.value.isDisabled = false
	}
})

</script>
<template>
  <div>
    <n-card
      v-if="state.current.page === Page.password"
      title="密碼"
    >
      <n-input v-model:value="state.data.password" />
      <n-button
        :disabled="state.isDisabled"
        type="primary"
        :loading="isPending"
        @click="handleGetTeenMeetingAttend()"
      >
        確認
      </n-button>
    </n-card>
    <div v-if="state.current.page === Page.dataPage">
      {{ state.api.getTeenMeetingAttend }}
    </div>
  </div>
</template>

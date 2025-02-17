<route lang="yaml">
  name: 'teenMeetingAttend'
  meta:
    layout: login
</route>
<script setup lang='ts'>
import { useMutation } from '@tanstack/vue-query'
import { NCard, NInput, NButton } from 'naive-ui'

import { useTeenMeetingAttendApi } from '@/hook'
import type { TeenMeetingAttendApiGetResponse } from '@/hook'

enum Page {
	password = 'password',
	dataPage = 'dataPage',
}

const message = useMessage()

const state = ref(
	{
		api: {
			getTeenMeetingAttend: null as TeenMeetingAttendApiGetResponse | null
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

const ageGroups = computed(() => ({
	'青職': state.value.api.getTeenMeetingAttend?.data.ageRange.youth.data || [],
	'大專': state.value.api.getTeenMeetingAttend?.data.ageRange.college.data || [],
	'青少年': state.value.api.getTeenMeetingAttend?.data.ageRange.teenager.data || [],
	'兒童1': state.value.api.getTeenMeetingAttend?.data.ageRange.child1.data || [],
	'兒童2': state.value.api.getTeenMeetingAttend?.data.ageRange.child2.data || [],
	'兒童3': state.value.api.getTeenMeetingAttend?.data.ageRange.child3.data || []
}))

const date = computed(() => {
	return state.value.api.getTeenMeetingAttend?.data.ageRange.youth.data[0]?.updatedAt ? new Date(state.value.api.getTeenMeetingAttend.data.ageRange.youth.data[0].updatedAt).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }) : '無更新資料'
})
</script>
<template>
  <div>
    <n-card
      v-if="state.current.page === Page.password"
      title="密碼"
    >
      <n-input
        v-model:value="state.data.password"
        class="mb-2"
      />
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
      <p class="text-lg font-bold">
        28會所專項報名情形：
      </p>
      <p>
        資料更新日期：{{ date }}
      </p>
      <template
        v-for="(group, label) in ageGroups"
        :key="label"
      >
        <p class="text-lg font-bold">
          {{ label }}
        </p>
        <span
          v-for="item in group"
          :key="item._id"
          class="text-sm mx-1"
        >
          {{ item.name }},
        </span>
      </template>
    </div>
  </div>
</template>

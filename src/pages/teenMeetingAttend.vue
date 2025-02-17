<route lang="yaml">
  name: 'teenMeetingAttend'
  meta:
    layout: none
</route>
<script setup lang='ts'>
import { useMutation } from '@tanstack/vue-query'
import { NCard, NInput, NButton, NTag, NTabs, NTabPane } from 'naive-ui'

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
      class="max-w-[300px]"
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
    <div
      v-if="state.current.page === Page.dataPage"
      class="mt-5"
    >
      <span class="text-sm font-bold">
        28會所青年特會報名情形：
      </span>
      <p class="text-[10px]">
        資料更新日期：{{ date }} (每天晚上20:00後更新資料)
      </p>
      <n-tabs
        type="line"
        animated
        default-value="專項"
      >
        <n-tab-pane
          name="專項"
          tab="專項"
        >
          <template
            v-for="(group, label) in ageGroups"
            :key="label"
          >
            <p class="text-md font-bold">
              {{ label }}
            </p>
            <span
              v-for="item in group"
              :key="item._id"
              class="text-sm mx-1"
            >
              <n-tag
                size="small"
                :bordered="false"
              >
                {{ item.name }}
              </n-tag>
            </span>
          </template>
        </n-tab-pane>
        <n-tab-pane
          name="青職邀約"
          tab="青職邀約"
        >
          青職邀約 （開發中）
        </n-tab-pane>
        <n-tab-pane
          name="大專青少邀約"
          tab="大專青少邀約"
        >
          大專青少年 （開發中）
        </n-tab-pane>
        <n-tab-pane
          name="福音朋友"
          tab="福音朋友"
        >

          會前來的 福音朋友 （開發中）
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

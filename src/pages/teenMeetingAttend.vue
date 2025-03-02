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
	}
})

watch(state.value.data, (val) => {
	if (val.password.length >= 3) {
		state.value.isDisabled = false
	}
})

const ageGroups = computed(() => ({
	'青職_目標28位': state.value.api.getTeenMeetingAttend?.data.ageRange.youth.data || [],
	'大專': state.value.api.getTeenMeetingAttend?.data.ageRange.college.data || [],
	'青少年': state.value.api.getTeenMeetingAttend?.data.ageRange.teenager.data || [],
	'其他': state.value.api.getTeenMeetingAttend?.data.ageRange.other.data || []
	// '兒童1': state.value.api.getTeenMeetingAttend?.data.ageRange.child1.data || [],
	// '兒童2': state.value.api.getTeenMeetingAttend?.data.ageRange.child2.data || [],
	// '兒童3': state.value.api.getTeenMeetingAttend?.data.ageRange.child3.data || []
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
        default-value="會所報名情形"
      >
        <n-tab-pane
          name="會所報名情形"
          tab="會所報名情形"
        >
          <template
            v-for="(group, label) in ageGroups"
            :key="label"
          >
            <p class="text-md font-bold">
              {{ label }} (報名{{ group.length }}位)
            </p>
            <span
              v-for="item in group"
              :key="item._id"
              class="text-sm mx-1"
            >
              <n-tag
                class="mb-1"
                size="small"
                :bordered="false"
              >
                {{ item.name }}
              </n-tag>
            </span>
            <p
              v-if="label === '青少年'"
              class="text-xs"
            >
              備注：青少年港湖有自己的表單，實際人數以港湖表單為主
            </p>
          </template>
        </n-tab-pane>
        <n-tab-pane
          name="數據"
          tab="數據"
        >
          數據
        </n-tab-pane>

      </n-tabs>
    </div>
  </div>
</template>

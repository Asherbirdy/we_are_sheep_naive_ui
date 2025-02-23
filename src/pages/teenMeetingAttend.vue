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
	'青職': state.value.api.getTeenMeetingAttend?.data.ageRange.youth.data || [],
	'大專': state.value.api.getTeenMeetingAttend?.data.ageRange.college.data || [],
	'青少年': state.value.api.getTeenMeetingAttend?.data.ageRange.teenager.data || [],
	'其他': state.value.api.getTeenMeetingAttend?.data.ageRange.other.data || [],
	'兒童1': state.value.api.getTeenMeetingAttend?.data.ageRange.child1.data || [],
	'兒童2': state.value.api.getTeenMeetingAttend?.data.ageRange.child2.data || [],
	'兒童3': state.value.api.getTeenMeetingAttend?.data.ageRange.child3.data || []
}))

// 合併所有報名資料
const allData = computed(() => [
	...(state.value.api.getTeenMeetingAttend?.data.ageRange.youth.data || []),
	...(state.value.api.getTeenMeetingAttend?.data.ageRange.college.data || []),
	...(state.value.api.getTeenMeetingAttend?.data.ageRange.teenager.data || []),
	...(state.value.api.getTeenMeetingAttend?.data.ageRange.other.data || []),
	...(state.value.api.getTeenMeetingAttend?.data.ageRange.child1.data || []),
	...(state.value.api.getTeenMeetingAttend?.data.ageRange.child2.data || []),
	...(state.value.api.getTeenMeetingAttend?.data.ageRange.child3.data || [])
])

const gospelFriends = computed(() => {
	return allData.value.filter((item) => item.meetingStatus === '福音朋友')
})

// 計算資料更新日期
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

      <span class="text-lg font-bold">
        28會所青年特會報名情形：
      </span>
      <p style="margin: 0;">
        更新日期：
      </p>
      <p style="margin: 0;">
        {{ date }} (每天晚上20:00後更新資料)
      </p>
      <n-tabs
        type="line"
        animated
        default-value="數據"
      >
        <n-tab-pane
          name="數據"
          tab="數據"
        >
          <p style="margin: 0;">
            {{ new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
          </p>
          <p style="margin: 0;">
            28會所 青年特會報名情形：
          </p>
          <p style="margin: 0;">
            大會負擔：一人邀約一位
          </p>
          <p style="margin: 0;">
            會所總目標： 180人
          </p>
          <p style="margin: 0;">
            目前已報名人數：{{ allData.length }}人
          </p>

          <br>

          <p style="margin: 0;">
            確定參加的福音朋友（{{ gospelFriends.length }}人）：
          </p>
          <span
            v-for="(item, index) in gospelFriends"
            :key="item._id"
          >
            {{ index + 1 }}. {{ item.name }} (照顧者：{{ item.sheepherd }})<br>
          </span>

        </n-tab-pane>
        <n-tab-pane
          name="會所報名情形"
          tab="會所報名情形"
        >
          <template
            v-for="(group, label) in ageGroups"
            :key="label"
          >
            <p class="text-md font-bold">
              {{ label }}（{{ group.length }}人）
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

      </n-tabs>
    </div>
  </div>
</template>

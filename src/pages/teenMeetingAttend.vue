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
	'大專/青少年_目標16位': [
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.college.data || []),
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.teenager.data || [])
	],
	'其他': state.value.api.getTeenMeetingAttend?.data.ageRange.other.data || []
	// '兒童1': state.value.api.getTeenMeetingAttend?.data.ageRange.child1.data || [],
	// '兒童2': state.value.api.getTeenMeetingAttend?.data.ageRange.child2.data || [],
	// '兒童3': state.value.api.getTeenMeetingAttend?.data.ageRange.child3.data || []
}))

const date = computed(() => {
	return state.value.api.getTeenMeetingAttend?.data.ageRange.youth.data[0]?.updatedAt ? new Date(state.value.api.getTeenMeetingAttend.data.ageRange.youth.data[0].updatedAt).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }) : '無更新資料'
})

// 四區
const allData = computed(() => {
	return [
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.youth.data || []),
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.college.data || []),
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.teenager.data || []),
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.other.data || [])
	]
})

const oneAreas = computed(() => {
	return allData.value.filter((item) => item.district === '一區')
})

const twoAreas = computed(() => {
	return allData.value.filter((item) => item.district === '二區')
})

const threeAreas = computed(() => {
	return allData.value.filter((item) => item.district === '三區')
})

const fourAreas = computed(() => {
	return allData.value.filter((item) => item.district === '四區')
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
              {{ label }} (已報名{{ group.length }}位)
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
          </template>
        </n-tab-pane>
        <n-tab-pane
          name="一區"
          tab="一區"
        >
          <div class="text-md font-bold text-[16px]">
            一區代禱名單:
          </div>
          <div
            v-for="item in oneAreas.filter((item) => item.inviteList !== '無')"
            :key="item._id"
          >
            <span class="text-md font-extrabold">
              {{ item.name }}：
            </span>
            <br>
            <div class="text-sm mb-2">
              {{ item.inviteList }}
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane
          name="二區"
          tab="二區"
        >
          <div class="text-md font-bold text-[16px]">
            二區代禱名單:
          </div>
          <div
            v-for="item in twoAreas.filter((item) => item.inviteList !== '無')"
            :key="item._id"
          >
            <span class="text-md font-extrabold">
              {{ item.name }}：
            </span>
            <br>
            <div class="text-sm mb-2">
              {{ item.inviteList }}
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane
          name="三區"
          tab="三區"
        >
          <div class="text-md font-bold text-[16px]">
            三區代禱名單:
          </div>
          <div
            v-for="item in threeAreas.filter((item) => item.inviteList !== '無')"
            :key="item._id"
          >
            <span class="text-md font-extrabold">
              {{ item.name }}：
            </span>
            <br>
            <div class="text-sm mb-2">
              {{ item.inviteList }}
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane
          name="四區"
          tab="四區"
        >
          <div class="text-md font-bold text-[16px]">
            四區代禱名單:
          </div>
          <div
            v-for="item in fourAreas.filter((item) => item.inviteList !== '無')"
            :key="item._id"
          >
            <span class="text-md font-extrabold">
              {{ item.name }}：
            </span>
            <br>
            <div class="text-sm mb-2">
              {{ item.inviteList }}
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

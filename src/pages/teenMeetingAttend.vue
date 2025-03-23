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
	'青職_目標28位': state.value.api.getTeenMeetingAttend?.data.ageRange.youth.data.filter((item) => item.participation !== '未確定出席_但先印名片') || [],
	'大專/青少年_目標16位': [
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.college.data.filter((item) => item.participation !== '未確定出席_但先印名片') || []),
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.teenager.data.filter((item) => item.participation !== '未確定出席_但先印名片') || [])
	],
	'兒童': [
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.child1.data.filter((item) => item.participation !== '未確定出席_但先印名片') || []),
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.child2.data.filter((item) => item.participation !== '未確定出席_但先印名片') || []),
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.child3.data.filter((item) => item.participation !== '未確定出席_但先印名片') || [])
	],
	'其他': state.value.api.getTeenMeetingAttend?.data.ageRange.other.data.filter((item) => item.participation !== '未確定出席_但先印名片') || []
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
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.child1.data || []),
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.child2.data || []),
		...(state.value.api.getTeenMeetingAttend?.data.ageRange.child3.data || []),
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
        placeholder="請輸入密碼"
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
        28會所青年大會報名情形：
      </span>
      <p class="text-[10px]">
        資料日期：{{ date }}
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
          <p class="text-sm">
          <div class="text-md font-bold">
            青年特會 報名情形：          <span class="text-md text-red-500">
              注意! 特會需要名牌才能入場!！
            </span>
          </div>
          請大家這<span class="text-red-500">
            週四(3/27)
          </span>前確認出席人數，並填到會所表單，方便服事人員印製名牌，謝謝！
          </p>
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
          name="福音朋友"
          tab="福音朋友"
        >
          <div class="text-md font-bold text-[16px]">
            已報名福音朋友:
          </div>
          <div
            v-for="(item,i) in allData.filter((item) => item.meetingStatus === '福音朋友')"
            :key="item._id"
          >
            <span>
              {{ i + 1 }}. {{ item.name }}({{ item.ageRange }}) 邀者：{{ item.sheepherd }}
            </span>
          </div>
        </n-tab-pane>
        <n-tab-pane
          name="各天報名"
          tab="各天報名"
        >
          <div>
            各天報名統計：
          </div>
          <div class="text-md font-bold text-[16px]">
            03/29 {{ allData.filter((item) => item.participation === '只參加3/29特會' || item.participation === '兩天都參加').length }}位:
          </div>
          <span>一區:</span><br>
          <n-tag
            v-for="item in allData
              .filter((item) => item.participation === '只參加3/29特會' || item.participation === '兩天都參加')
              .filter((item) => item.district === '一區')"
            :key="item._id"
            class="mb-1 mr-1"
            size="tiny"
          >
            {{ item.name }}
          </n-tag>
          <br>
          <span>二區:</span><br>
          <n-tag
            v-for="item in allData
              .filter((item) => item.participation === '只參加3/29特會' || item.participation === '兩天都參加')
              .filter((item) => item.district === '二區')"
            :key="item._id"
            class="mb-1 mr-1"
            size="tiny"
          >
            {{ item.name }}
          </n-tag>
          <br>
          <span>三區:</span><br>
          <n-tag
            v-for="item in allData
              .filter((item) =>
                item.participation === '只參加3/29特會' ||
                item.participation === '兩天都參加')
              .filter((item) => item.district === '三區')"
            :key="item._id"
            class="mb-1 mr-1"
            size="tiny"
          >
            {{ item.name }}
          </n-tag>
          <br>
          <span>四區:</span><br>
          <n-tag
            v-for="item in allData
              .filter((item) =>
                item.participation === '只參加3/29特會' ||
                item.participation === '兩天都參加')
              .filter((item) => item.district === '四區')"
            :key="item._id"
            class="mb-1 mr-1"
            size="tiny"
          >
            {{ item.name }}
          </n-tag>
          <div class="text-md font-bold text-[16px]">
            03/30 {{ allData.filter((item) =>
              item.participation === '只參加3/30主日' ||
              item.participation === '兩天都參加').length }}位:
          </div>
          <span>一區:</span><br>
          <n-tag
            v-for="item in allData.filter((item) =>
              item.participation === '只參加3/30主日' ||
              item.participation === '兩天都參加')
              .filter((item) => item.district === '一區')"
            :key="item._id"
            class="mb-1 mr-1"
            size="tiny"
          >
            {{ item.name }}
          </n-tag>
          <br>
          <span>二區:</span><br>
          <n-tag
            v-for="item in allData.filter((item) =>
              item.participation === '只參加3/30主日' ||
              item.participation === '兩天都參加')
              .filter((item) => item.district === '二區')"
            :key="item._id"
            class="mb-1 mr-1"
            size="tiny"
          >
            {{ item.name }}
          </n-tag>
          <br>
          <span>三區:</span><br>
          <n-tag
            v-for="item in allData.filter((item) =>
              item.participation === '只參加3/30主日' ||
              item.participation === '兩天都參加')
              .filter((item) => item.district === '三區')"
            :key="item._id"
            class="mb-1 mr-1"
            size="tiny"
          >
            {{ item.name }}
          </n-tag>
          <br>
          <span>四區:</span><br>
          <n-tag
            v-for="item in allData.filter((item) =>
              item.participation === '只參加3/30主日' ||
              item.participation === '兩天都參加')
              .filter((item) => item.district === '四區')"
            :key="item._id"
            class="mb-1 mr-1"
            size="tiny"
          >
            {{ item.name }}
          </n-tag>
          <div class="text-md font-bold text-[16px] text-red-500">
            未勾選參加時間 {{ allData.filter((item) => item.participation === '未選擇').length }}位:
          </div>
          <n-tag
            v-for="item in allData.filter((item) => item.participation === '未選擇')"
            :key="item._id"
            class="mb-1 mr-1"
            size="tiny"
          >
            {{ item.name }}
          </n-tag>
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

<script setup lang='ts'>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { NButton, NTabs, NTabPane, NModal, NInput, NDataTable, NDrawer, NDrawerContent, NP, NQrCode, NSpace } from 'naive-ui'
import type {  DataTableColumns } from 'naive-ui'

import { Role } from '@/enums/RoleEnum'
import { useUserApi } from '@/hook'
import { useUserSerialNumberApi } from '@/hook/useUserSerialNumberApi'
import type { LeaderCreateSerialNumberResponse } from '@/types'

const queryClient = useQueryClient()
const message = useMessage()
const state = ref({
	data: {
		note: ''
	},
	api: {
		createAccount: null
	},
	serialNumber: '',
	url: '',
	status: {
		modal: false,
		isInput: true,
		submitDisabled: true,
		drawer: false
	},
	drawerData: {
		notes: '',
		serialNumber: '',
		url: '',
		isUsed: false
	}
})

const onPositiveClick = (payload: string) => {
	navigator.clipboard.writeText(payload)
	message.success('複製網址成功')
}

const { data: handleGetUser } = useQuery({
	queryKey: [useUserApi.showMe.queryKey],
	queryFn: () => useUserApi.showMe.api()
})

const role = computed(() => handleGetUser.value?.user?.role)

watch(state.value.data, (newVal) => {
	const check = Boolean(newVal.note)
	state.value.status.submitDisabled = !check
})

const {
	mutate: handleCreateAccount,
	isPending: isCreateAccountPending
} = useMutation({
	mutationFn: async () => await useUserSerialNumberApi.leaderCreateSerialNumber.api({
		notes: state.value.data.note
	}),
	onSuccess: (data: LeaderCreateSerialNumberResponse) => {
		state.value.status.isInput = false
		state.value.serialNumber = data.serialNumber.serialNumber
		state.value.url = `${window.location.origin}/C/?serialNumber=${data.serialNumber.serialNumber}&tab=註冊`

		queryClient.invalidateQueries({
			queryKey: [useUserSerialNumberApi.leaderGetUserSerialNumber.queryKey]
		})
	}
})

const { data: handleGetUserSerialNumber } = useQuery({
	queryKey: [useUserSerialNumberApi.leaderGetUserSerialNumber.queryKey],
	queryFn: () => useUserSerialNumberApi.leaderGetUserSerialNumber.api()
})

const personalColumns = (): DataTableColumns<any> => {
	return [
		{
			title: 'note',
			key: 'notes',
			width: '30%'
		},
		{
			title: 'isUsed',
			key: 'isUsed',
			render: (row) => row.isUsed ? '已使用' : '未使用'
		},
		{
			title: '',
			key: 'action',
			render: (row) => h(
				NButton,
				{
					onClick: () => {
						const { drawerData } = state.value
						drawerData.notes = row.notes
						drawerData.serialNumber = row.serialNumber
						drawerData.url = `${window.location.origin}/C/?serialNumber=${row.serialNumber}&tab=註冊`
						drawerData.isUsed = row.isUsed
						state.value.status.drawer = true
					}
				},
				{ default: () => '詳細' }
			)
		}
	]
}
</script>

<template>
  <div>
    <n-tabs
      v-if="(
        role === Role.districtLeader ||
        role === Role.admin ||
        role === Role.dev
      )"
      type="segment"
      animated
    >
      <n-tab-pane
        name="createAccount"
        tab="開戶"
      >
        <n-button
          type="primary"
          @click="state.status.modal = true"
        >
          開戶
        </n-button>
      </n-tab-pane>
      <n-tab-pane
        name="createAccountStatus"
        tab="開戶狀態"
      >
        <n-data-table
          size="small"
          :bordered="false"
          :single-line="false"
          :columns="personalColumns()"
          :data="handleGetUserSerialNumber?.data"
        />
      </n-tab-pane>
    </n-tabs>
    <div v-else>
      無權限開戶
    </div>
    <n-modal
      v-model:show="state.status.modal"
      :mask-closable="false"
      preset="dialog"
      title="開戶"
      content="Are you sure?"
    >
      <div v-if="state.status.isInput">
        <n-input
          v-model:value="state.data.note"
          class="my-5"
          placeholder="請輸入開戶的名字"
        />
        <n-button
          type="primary"
          :disabled="state.status.submitDisabled"
          :loading="isCreateAccountPending"
          @click="handleCreateAccount()"
        >
          開戶
        </n-button>
      </div>
      <div v-else>
        <p>
          將網址傳給對方就能開戶
        </p>
        <p>
          網址：{{ state.url }}
        </p>
        <n-space
          justify="center"
          align="center"
        >
          <n-qr-code
            :size="200"
            :value="state.url"
            class="my-5"
          />
        </n-space>
        <n-button
          type="primary"
          block
          @click="onPositiveClick(state.url)"
        >
          複製網址
        </n-button>
      </div>
    </n-modal>
    <n-drawer
      v-model:show="state.status.drawer"
      placement="bottom"
      :height="500"
    >
      <n-drawer-content>
        <n-p>
          名字：{{ state.drawerData.notes }}
        </n-p>
        <n-p>
          編號：{{ state.drawerData.serialNumber }}
        </n-p>
        <n-space
          justify="center"
          align="center"
        >
          <n-qr-code
            :size="200"
            :value="state.drawerData.url"
            class="my-5"
          />
        </n-space>
        <n-button
          v-if="!state.drawerData.isUsed"
          block
          type="primary"
          @click="onPositiveClick(state.drawerData.url)"
        >
          複製註冊網址
        </n-button>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<!-- <style scoped>
* {
  outline: 1px solid red;
}
</style> -->

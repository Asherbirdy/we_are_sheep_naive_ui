<script setup lang='ts'>
import { useMutation, useQuery } from '@tanstack/vue-query'
import { NButton, NTabs, NTabPane, NModal, NInput } from 'naive-ui'

import { Role } from '@/enums/RoleEnum'
import { useUserApi } from '@/hook'
import { useUserSerialNumberApi } from '@/hook/useUserSerialNumberApi'
import type { LeaderCreateSerialNumberResponse } from '@/types'

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
		submitDisabled: true
	}
})

const onPositiveClick = () => {
	navigator.clipboard.writeText(state.value.url)
	message.success('複製網址成功')
}

const onCreateAccount = () => {
	state.value.status.modal = true
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
		state.value.url = `${window.location.origin}/C/?serialNumber=${data.serialNumber.serialNumber}&tab=register`
	}
})

</script>

<template>
  <div>
    <n-tabs
      v-if="role === Role.districtLeader || role === Role.admin || role === Role.dev"
      type="segment"
      animated
    >
      <n-tab-pane
        name="createAccount"
        tab="開戶"
      >
        <n-button
          type="primary"
          @click="onCreateAccount"
        >
          開戶
        </n-button>
      </n-tab-pane>
      <n-tab-pane
        name="createAccountStatus"
        tab="開戶狀態"
      >
        Hey Jude
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
        <n-button
          type="primary"
          block
          @click="onPositiveClick"
        >
          複製網址
        </n-button>
      </div>
    </n-modal>
  </div>
</template>
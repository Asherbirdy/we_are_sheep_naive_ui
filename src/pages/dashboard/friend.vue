<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NDrawer, NDrawerContent, NInput, NTabs, NTabPane, NCard } from 'naive-ui'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores'
const userStore = useUserStore()
const { getUser } = storeToRefs(userStore)
const notification = useNotification()
interface rowType {
	name: string
}

const state = ref({
	data: {
		request: ''
	},
	status: {
		drawer: false
	}
})

const createColumns = (): DataTableColumns<rowType> => [
	{
		title: 'Name',
		key: 'name',
		resizable: true
	},
	{
		title: 'Action',
		key: 'actions',
		render: (row) => h(
			NButton,
			{
				strong: true,
				tertiary: true,
				size: 'tiny',
				onClick: () => console.log(row)
			},
			{ default: () => '看名單' }
		)
	}
]

const data: rowType[] = [
	{ name: 'Wonderwall' },
	{ name: 'Don\'t Look Back in Anger' },
	{ name: 'Champagne Supernova' }
]

const onCopyId = () => {
	navigator.clipboard.writeText(getUser.value?._id || '')
	notification.success({
		content: '複製成功',
		duration: 2500,
		keepAliveOnHover: true
	})
}
</script>

<template>
  <div>
    <n-tabs
      type="segment"
      animated
    >
      <n-tab-pane
        name="friend"
        tab="好友"
      >
        <n-space
          vertical
          justify="space-between"
          align="center"
        >
          <n-data-table
            :columns="createColumns()"
            :data="data"
            :bordered="false"
            class="h-[calc(100dvh-250px)]"
          />
          <n-button
            type="primary"
            block
            @click="state.status.drawer = true"
          >
            新增好友
          </n-button>
        </n-space>
      </n-tab-pane>
      <n-tab-pane
        name="request"
        tab="請求中"
      >
        Hey Jude
      </n-tab-pane>
    </n-tabs>
    <n-drawer
      v-model:show="state.status.drawer"
      :width="502"
      placement="bottom"
      :default-height="200"
    >
      <n-drawer-content>
        <n-tabs
          default-value="my ID"
          justify-content="space-evenly"
          type="line"
        >
          <n-tab-pane
            name="my ID"
            tab="My ID"
          >
            <n-card>
              {{ getUser?._id }}
            </n-card>
            <n-button
              block
              type="primary"
              @click="onCopyId"
            >
              複製
            </n-button>
          </n-tab-pane>
          <n-tab-pane
            name="Add Friend"
            tab="Add Friend"
          >
            <n-input
              v-model:value="state.data.request"
              type="text"
              placeholder="Id"
              class="mb-2"
            />
            <n-button
              block
              type="primary"
              :disabled="!state.data.request"
            >
              發送請求
            </n-button>
          </n-tab-pane>
        </n-tabs>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

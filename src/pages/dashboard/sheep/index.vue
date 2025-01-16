<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag, NDataTable, NTabPane, NTabs, NSpace } from 'naive-ui'

import { QueryKeyEnum } from '@/enums'
import { useSheepApi } from '@/hook'

export interface RowData {
	_id: string
	name: string
	ageRange: string
	tags: any[]
	focusPerson: boolean
	userId: string
	personStatus: string
	note: string
	createdAt: string
	updatedAt: string
	__v: number
}

enum Page {
	home = 'home',
	details = 'details',
}

// * 頁面狀態
const state = ref({
	data: {
		details: null as RowData | null
	},
	page: {
		current: Page.home
	}
})

// * 取得牧養名單
const { data: handleSheepList } = useQuery({
	queryKey: [QueryKeyEnum.sheepList],
	queryFn: () => useSheepApi.getSheepList()
})

// * 建立表格欄位
const createColumns = (): DataTableColumns<RowData> => {
	return [
		{
			title: '姓名',
			key: 'name',
			width: '20%'
		},
		{
			title: '標籤',
			key: 'tags',
			render (row) {
				const tags = row.tags.map((tagKey) => {
					return h(
						NTag,
						{
							style: {
								marginRight: '6px'
							},
							type: 'info',
							bordered: false,
							size: 'small'
						},
						{
							default: () => tagKey
						}
					)
				})
				return tags
			}
		},
		{
			title: '',
			key: 'actions',
			width: '30%',
			render (row) {
				return h(
					NButton,
					{
						size: 'small',
						onClick: () => {
							state.value.page.current = Page.details
							state.value.data.details = row
							console.log(state.value.data.details)
						}
					},
					{ default: () => '詳細形況' }
				)
			}
		}
	]
}

</script>

<template>
  <div>
    <n-space
      v-if="state.page.current === Page.home"
      vertical
    >
      <n-tabs
        type="segment"
        animated
      >
        <n-tab-pane
          name="focus"
          tab="重點牧養"
        >
          <n-data-table
            :bordered="false"
            :single-line="false"
            :columns="createColumns()"
            :data="handleSheepList?.list.focusPersonList"
          />
        </n-tab-pane>
        <n-tab-pane
          name="non-focus"
          tab="其他名單"
        >
          <n-data-table
            :bordered="false"
            :single-line="false"
            :columns="createColumns()"
            :data="handleSheepList?.list.nonFocusPersonList"
          />
        </n-tab-pane>
      </n-tabs>
    </n-space>
    <n-space
      v-else
      vertical
    >
      {{ state.data.details }}
    </n-space>
  </div>
</template>

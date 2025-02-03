<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { NSpace, NTabs, NTabPane, NTag, NDataTable } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

import { useSheepApi } from '@/hook'

interface Sheep {
	name: string
	weekInviteTag: string[]
	careGiverName: string
}

const createColumns = (): DataTableColumns<Sheep> => {
	return [
		{
			title: '姓名',
			key: 'name',
			width: '30%'
		},
		{
			title: '此週邀約',
			key: 'weekInviteTag',
			render (row) {
				const tags = row.weekInviteTag.map((tagKey) => {
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
			title: '照顧者',
			key: 'userId.name',
			width: '30%'
		}
	]
}

const { data: handleDistrictSheepList } = useQuery({
	queryKey: [useSheepApi.getUserDistrictSheep.queryKey],
	queryFn: () => useSheepApi.getUserDistrictSheep.api()
})

</script>

<template>
  <div>
    <n-space vertical>
      <n-tabs
        type="segment"
        animated
      >
        <n-tab-pane
          name="male"
          tab="區重點牧養(男介)"
        >
          <n-data-table
            :bordered="false"
            :single-line="false"
            :columns="createColumns()"
            :data="handleDistrictSheepList?.data.male"
          />
        </n-tab-pane>
        <n-tab-pane
          name="female"
          tab="區重點牧養(女介)"
        >
          <n-data-table
            :bordered="false"
            :single-line="false"
            :columns="createColumns()"
            :data="handleDistrictSheepList?.data.female"
          />
        </n-tab-pane>
      </n-tabs>
    </n-space>
  </div>
</template>
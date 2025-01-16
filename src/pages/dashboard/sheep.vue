<script setup lang='ts'>
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag, useMessage, NDataTable, NTabPane, NTabs } from 'naive-ui'

interface RowData {
	_id: string
	name: string
	tags: string[]
}

const message = useMessage()

const createColumns = (): DataTableColumns<RowData> => {
	return [
		{
			title: 'Name',
			key: 'name'
		},
		{
			title: 'Tags',
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
			title: 'Action',
			key: 'actions',
			render (row) {
				return h(
					NButton,
					{
						size: 'small',
						onClick: () => message.info(`send mail to ${row.name}`)
					},
					{ default: () => 'Send Email' }
				)
			}
		}
	]
}
const createData = (): RowData[] => {
	return [
		{
			name: 'John Brown',
			tags: ['nice', 'developer'],
			_id: '123'
		},
		{
			name: 'Jim Green',
			tags: ['wow'],
			_id: '123'
		},
		{
			name: 'Joe Black',
			tags: ['cool', 'teacher'],
			_id: '123'
		}
	]
}

</script>

<template>
  <div>
    <n-tabs
      type="segment"
      animated
    >
      <n-tab-pane
        name="focus"
        tab="Focus"
      >
        <n-data-table
          :bordered="false"
          :single-line="false"
          :columns="createColumns()"
          :data="createData()"
        />
      </n-tab-pane>
      <n-tab-pane
        name="non-focus"
        tab="Non-Focus"
      >
        Non-Focus
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

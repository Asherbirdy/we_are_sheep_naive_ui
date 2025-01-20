<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query'
import { ArrowBack } from '@vicons/ionicons5'
import { NButton, NTag, NDataTable, NTabPane, NTabs, NSpace, NFlex, NP, NCard, NIcon, NDrawer, NDrawerContent, NForm, NFormItem, NInput } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type {
	FormInst,
	FormItemRule,
	FormRules
} from 'naive-ui'

import { PersonListKey, QueryKeyEnum } from '@/enums'
import { AgeRange, ageRangeToText } from '@/enums/AgeRangeEnum'
import { useSheepApi } from '@/hook'
import type { PersonList } from '@/types'

enum Page {
	home = 'home',
	details = 'details',
}

const formRef = ref<FormInst | null>(null)

// * 頁面狀態
const state = ref({
	data: {
		details: {
			[PersonListKey._id]: '',
			[PersonListKey.name]: '',
			[PersonListKey.ageRange]: '',
			[PersonListKey.tags]: [],
			[PersonListKey.focusPerson]: false,
			[PersonListKey.userId]: '',
			[PersonListKey.personStatus]: '',
			[PersonListKey.note]: '',
			createdAt: '',
			updatedAt: '',
			__v: 0
		} as PersonList
	},
	page: {
		current: Page.home
	},
	status: {
		drawer: false
	}
})

// * 取得牧養名單
const { data: handleSheepList } = useQuery({
	queryKey: [QueryKeyEnum.sheepList],
	queryFn: () => useSheepApi.getSheepList()
})

// * 建立表格欄位
const createColumns = (): DataTableColumns<PersonList> => {
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
						}
					},
					{ default: () => '詳細形況' }
				)
			}
		}
	]
}

const rules: FormRules = {
	age: [
		{
			required: true,
			validator (rule: FormItemRule, value: string) {
				if (!value) {
					return new Error('Age is required')
				}
				else if (!/^\d*$/.test(value)) {
					return new Error('Age should be an integer')
				}
				else if (Number(value) < 18) {
					return new Error('Age should be above 18')
				}
				return true
			},
			trigger: ['input', 'blur']
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
      justify="space-between"
      class="h-[calc(100vh-100px)]"
    >
      <n-flex vertical>
        <n-icon
          size="26"
          @click="state.page.current = Page.home"
        >
          <ArrowBack />
        </n-icon>
        <n-card :title="`${state.data.details?.name}${ageRangeToText(state.data.details?.ageRange as AgeRange)}`">
          <div>
            狀態:<n-tag>{{ state.data.details?.personStatus }}</n-tag>
          </div>
          <div>
            <n-tag>標籤</n-tag>
            <n-tag>{{ state.data.details?.tags }}</n-tag>
          </div>
        </n-card>
        <n-p>
          備註:
          {{ state.data.details?.note || '無備註' }}
        </n-p>
      </n-flex>
      <n-button
        block
        type="primary"
        @click="state.status.drawer = true"
      >
        編輯
      </n-button>
    </n-space>
    <n-drawer
      v-model:show="state.status.drawer"
      default-height="600px"
      placement="bottom"
    >
      <n-drawer-content
        title="Stoner"
        closable
      >
        <n-form
          ref="formRef"
          :model="state.data.details"
          :rules="rules"
        >
          <n-form-item
            path="age"
            label="Age"
          >
            <n-input
              v-model:value="state.data.details._id"
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-form>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

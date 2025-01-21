<script setup lang='ts'>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { NButton, NTag, NDataTable, NTabPane, NTabs, NSpace, NDrawer, NDrawerContent, NForm, NFormItem, NInput, NSelect, NRadioGroup, NRadio } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type {
	FormInst,
	FormItemRule,
	FormRules
} from 'naive-ui'

import AddSheepBtnComponent from '@/components/app/sheep/AddSheepBtnComponent.vue'
import { PersonListKey, QueryKeyEnum, ageRangeOptions  } from '@/enums'
import { useSheepApi } from '@/hook'
import type { PersonList } from '@/types'

enum Page {
	home = 'home',
}

const formRef = ref<FormInst | null>(null)
const queryClient = useQueryClient()

// * 頁面狀態
const state = ref({
	data: {
		details: {
			[PersonListKey._id]: '',
			[PersonListKey.name]: '',
			[PersonListKey.ageRange]: '',
			[PersonListKey.tags]: [],
			[PersonListKey.focusPerson]: '',
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
							const { details } = state.value.data
							nextTick(() => {
								details.name = row.name
								details.ageRange = row.ageRange
								details.personStatus = row.personStatus
								details.tags = row.tags
								details.focusPerson = row.focusPerson
								details.note = row.note
								details._id = row._id
								state.value.status.drawer = true
							})
						}
					},
					{ default: () => '詳細形況' }
				)
			}
		}
	]
}

const rules: FormRules = {
	[PersonListKey.name]: [
		{
			required: true,
			validator (rule: FormItemRule, value: string) {
				if (!value) {
					return new Error('姓名是必填')
				}
				else if (!/^\d*$/.test(value)) {
					return new Error('姓名應為數字')
				}
				else if (Number(value) < 18) {
					return new Error('姓名應為數字')
				}
				return true
			},
			trigger: ['input', 'blur']
		}
	]
}

const songs = [
	{
		label: '重點牧養',
		value: 'isFocus'
	},
	{
		label: '其他名單',
		value: 'notFocus'
	}
]

const statusOptions = [
	{
		label: '無設定',
		value: 'none'
	},
	{
		label: '正常聚會',
		value: 'normal'
	},
	{
		label: '久未聚會',
		value: 'longTimeNoSee'
	},
	{
		label: '福音朋友',
		value: 'gospelfriend'
	}
]

const tagsOptions = [
	{
		label: '已邀主日',
		value: '已邀主日'
	},
	{
		label: '已邀家聚會',
		value: '已邀家聚會'
	},
	{
		label: '已邀加小排',
		value: '已邀加小排'
	}
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { mutate: handleUpdateSheep } = useMutation({
	mutationFn: () => {
		const payload = {
			sheepId: state.value.data.details._id,
			data: {
				ageRange: state.value.data.details.ageRange,
				tags: state.value.data.details.tags,
				focusPerson: state.value.data.details.focusPerson,
				personStatus: state.value.data.details.personStatus,
				note: state.value.data.details.note
			}
		}
		return useSheepApi.editSheep(payload)
	},
	onSuccess: () => {
		state.value.status.drawer = false
	},
	onSettled: async () => await queryClient.invalidateQueries({
		queryKey: [QueryKeyEnum.sheepList]
	})
})
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
        <n-tab-pane
          name="common"
          tab="共同小羊"
        >
          開發中
        </n-tab-pane>
      </n-tabs>
    </n-space>
    <n-drawer
      v-model:show="state.status.drawer"
      default-height="600px"
      placement="bottom"
    >
      <n-drawer-content
        :title="state.data.details?.name"
        closable
      >
        <n-form
          ref="formRef"
          :model="state.data.details"
          :rules="rules"
          size="small"
        >
          <n-form-item
            :path="PersonListKey.ageRange"
            label="年齡範圍"
          >
            <n-select
              v-model:value="state.data.details[PersonListKey.ageRange]"
              :options="ageRangeOptions"
            />
          </n-form-item>
          <n-form-item
            :path="PersonListKey.focusPerson"
            label="分類"
          >
            <n-radio-group
              v-model:value="state.data.details[PersonListKey.focusPerson]"
              name="radiogroup"
            >
              <n-space>
                <n-radio
                  v-for="song in songs"
                  :key="song.label"
                  :value="song.value"
                  :label="song.label"
                />
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item
            :path="PersonListKey.personStatus"
            label="狀態"
          >
            <n-select
              v-model:value="state.data.details[PersonListKey.personStatus]"
              :options="statusOptions"
            />
          </n-form-item>
          <n-form-item
            :path="PersonListKey.note"
            label="這週邀約請形"
          >
            <n-select
              v-model:value="state.data.details[PersonListKey.tags]"
              multiple
              :options="tagsOptions"
            />
          </n-form-item>
          <n-form-item
            :path="PersonListKey.note"
            label="備註"
          >
            <n-input
              v-model:value="state.data.details[PersonListKey.note]"
              type="textarea"
              placeholder="Basic Textarea"
            />
          </n-form-item>
        </n-form>
        <n-button
          type="primary"
          @click="handleUpdateSheep()"
        >
          更新
        </n-button>
      </n-drawer-content>
    </n-drawer>
    <AddSheepBtnComponent />
  </div>
</template>

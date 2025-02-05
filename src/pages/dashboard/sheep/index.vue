<script setup lang='ts'>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Trash } from '@vicons/ionicons5'
import { NButton, NIcon, NTag, NDataTable, NTabPane, NTabs, NSpace, NDrawer, NDrawerContent, NForm, NFormItem, NInput, NSelect, NRadioGroup, NRadio, NPopconfirm } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { FormInst,	FormItemRule, FormRules } from 'naive-ui'

import AddSheepBtnComponent from '@/components/app/sheep/AddSheepBtnComponent.vue'
import { Identity, PersonListKey, ageRangeOptions, focusOptions, identityOptions, identityToText, statusOptions, tagsOptions } from '@/enums'
import { useSheepApi } from '@/hook'
import type { EditSheepPayload, PersonList, UserAndDistrictSheepResponse } from '@/types'

const formRef = ref<FormInst | null>(null)
const queryClient = useQueryClient()

// * 頁面狀態
const state = ref({
	data: {
		details: {
			[PersonListKey._id]: '',
			[PersonListKey.name]: '',
			[PersonListKey.ageRange]: '',
			[PersonListKey.identity]: Identity.Brother,
			[PersonListKey.focusPerson]: '',
			[PersonListKey.userId]: '',
			[PersonListKey.personStatus]: '',
			[PersonListKey.note]: '',
			[PersonListKey.weekInviteTag]: [],
			createdAt: '',
			updatedAt: '',
			__v: 0
		} as PersonList
	},
	status: {
		drawer: false
	}
})

// * 取得牧養名單
const { data: handleSheepList } = useQuery<UserAndDistrictSheepResponse>({
	queryKey: [useSheepApi.getUserAndDistrictSheep.queryKey],
	queryFn: () => useSheepApi.getUserAndDistrictSheep.api()
})

// * 建立表格欄位
const createColumns = (): DataTableColumns<PersonList> => {
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
			title: '',
			key: 'actions',
			width: '5%',
			render (row) {
				return h(
					NButton,
					{
						size: 'tiny',
						onClick: () => {
							const { details } = state.value.data
							nextTick(() => {
								details.name = row.name
								details.ageRange = row.ageRange
								details.personStatus = row.personStatus
								details.weekInviteTag = row.weekInviteTag
								details.identity = row.identity
								details.focusPerson = row.focusPerson
								details.note = row.note
								details._id = row._id
								state.value.status.drawer = true
							})
						}
					},
					{ default: () => '詳細' }
				)
			}
		}
	]
}

const createColumns2 = (): DataTableColumns<PersonList> => {
	return [
		{
			title: '姓名',
			key: 'name',
			width: '30%'
		},
		{
			title: '身份',
			key: 'identity',
			width: '30%',
			render (row) {
				return identityToText(row.identity)
			}
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
			title: '聯絡人',
			key: 'userId.name',
			width: '30%'
		}
	]
}

// * 驗證規則
const rules: FormRules = {
	[PersonListKey.name]: [
		{
			required: true,
			validator (rule: FormItemRule, value: string) {
				if (!value) {
					return new Error('姓名是必填')
				}
				return true
			},
			trigger: ['input', 'blur']
		}
	]
}

// * 更新
const { mutate: handleUpdateSheep } = useMutation({
	mutationFn: () => {
		const payload: EditSheepPayload = {
			sheepId: state.value.data.details._id,
			data: {
				ageRange: state.value.data.details.ageRange,
				weekInviteTag: state.value.data.details.weekInviteTag,
				identity: state.value.data.details.identity,
				focusPerson: state.value.data.details.focusPerson,
				personStatus: state.value.data.details.personStatus,
				note: state.value.data.details.note
			}
		}
		return useSheepApi.editSheep.api(payload)
	},
	onSuccess: () => {
		state.value.status.drawer = false
	},
	onSettled: async () => await queryClient.invalidateQueries({
		queryKey: [useSheepApi.getUserAndDistrictSheep.queryKey]
	})
})

const { mutate: handleDeleteSheep } = useMutation({
	mutationFn: () => useSheepApi.deleteSheep.api(state.value.data.details._id),
	onSuccess: () => state.value.status.drawer = false,
	onSettled: async () => await queryClient.invalidateQueries({
		queryKey: [useSheepApi.getUserAndDistrictSheep.queryKey]
	})
})

const message = useMessage()

const handlePositiveClick = () => {
	handleDeleteSheep()
	message.info('刪除成功')
}
const handleNegativeClick = () => {
	message.info('取消刪除')
}

</script>

<template>
  <div>
    <n-space vertical>
      <!--
        Tabs
      -->
      <n-tabs
        type="segment"
        default-value="personal"
        animated
      >
        <n-tab-pane
          name="personal"
          tab="個人名單"
        >
          <n-data-table
            :bordered="false"
            :single-line="false"
            :columns="createColumns()"
            :data="handleSheepList?.data.personal"
          />
        </n-tab-pane>
        <n-tab-pane
          name="district"
          tab="區裡名單"
        >
          <n-data-table
            :bordered="false"
            :single-line="false"
            :columns="createColumns2()"
            :data="handleSheepList?.data.district"
          />
        </n-tab-pane>
      </n-tabs>
    </n-space>
    <!--
      Drawer
    -->
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
            :path="PersonListKey.identity"
            label="定位"
          >
            <n-select
              v-model:value="state.data.details[PersonListKey.identity]"
              :options="identityOptions"
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
                  v-for="option in focusOptions"
                  :key="option.label"
                  :value="option.value"
                  :label="option.label"
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
            :path="PersonListKey.weekInviteTag"
            label="這週邀約請形"
          >
            <n-select
              v-model:value="state.data.details[PersonListKey.weekInviteTag]"
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
        <n-space justify="space-between">
          <n-button
            type="primary"
            @click="handleUpdateSheep()"
          >
            更新
          </n-button>
          <n-popconfirm
            @positive-click="handlePositiveClick"
            @negative-click="handleNegativeClick"
          >
            <template #trigger>
              <n-button
                quaternary
                circle
              >
                <template #icon>
                  <n-icon><Trash /></n-icon>
                </template>
              </n-button>
            </template>
            確定要刪除嗎？
          </n-popconfirm>
        </n-space>
      </n-drawer-content>
    </n-drawer>
    <AddSheepBtnComponent />
  </div>
</template>

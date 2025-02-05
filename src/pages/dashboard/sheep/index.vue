<script setup lang='ts'>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Trash } from '@vicons/ionicons5'
import { NButton, NIcon, NTag, NDataTable, NTabPane, NTabs, NSpace, NDrawer, NDrawerContent, NForm, NFormItem, NInput, NSelect, NRadioGroup, NRadio, NPopconfirm } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { FormInst,	FormItemRule, FormRules } from 'naive-ui'

import AddSheepBtnComponent from '@/components/app/sheep/AddSheepBtnComponent.vue'
import { AgeRange, Identity, PersonListKey, PersonStatus, ageRangeOptions, ageRangeToText, focusOptions, identityOptions, identityToText, personStatusToText, statusOptions, tagsOptions } from '@/enums'
import { useSheepApi } from '@/hook'
import type { EditSheepPayload, PersonList, UserAndDistrictSheepResponse } from '@/types'

const formRef = ref<FormInst | null>(null)
const queryClient = useQueryClient()

const message = useMessage()

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
			[PersonListKey.weekInviteTag]: [] as string[],
			createdAt: '',
			updatedAt: '',
			__v: 0
		}
	},
	status: {
		editDrawer: false,
		viewDrawer: false
	}
})

// * 刷新資料
const refreshCurrentData = (row: PersonList) => {
	const { details } = state.value.data
	details.name = row.name
	details.ageRange = row.ageRange
	details.personStatus = row.personStatus
	details.weekInviteTag = row.weekInviteTag
	details.identity = row.identity
	details.focusPerson = row.focusPerson
	details.note = row.note
	details._id = row._id
}

// * 取得牧養名單
const { data: handleSheepList } = useQuery<UserAndDistrictSheepResponse>({
	queryKey: [useSheepApi.getUserAndDistrictSheep.queryKey],
	queryFn: () => useSheepApi.getUserAndDistrictSheep.api()
})

// * 建立表格欄位
const personalColumns = (): DataTableColumns<PersonList> => {
	return [
		{
			title: '姓名',
			key: PersonListKey.name,
			width: '30%'
		},
		{
			title: '此週邀約',
			key: PersonListKey.weekInviteTag,
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
							refreshCurrentData(row)
							state.value.status.editDrawer = true
						}
					},
					{ default: () => '詳細' }
				)
			}
		}
	]
}

// * 區裡名單表格欄位
const districtColumns = (): DataTableColumns<PersonList> => {
	return [
		{
			title: '姓名',
			key: PersonListKey.name,
			width: '30%'
		},
		{
			title: '身份',
			key: PersonListKey.identity,
			width: '30%',
			render: (row) => identityToText(row.identity)
		},
		{
			title: '此週邀約',
			key: PersonListKey.weekInviteTag,
			render (row) {
				const tags = row.weekInviteTag.map((tagKey) => h(
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
				)
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

// * 點擊行 並打開詳細資料 Drawer
const onRowClick = (row: PersonList) => {
	return {
		style: 'cursor: pointer;',
		onClick: () => {
			refreshCurrentData(row)
			state.value.status.viewDrawer = true
		}
	}
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
		const { details } = state.value.data
		const payload: EditSheepPayload = {
			sheepId: details._id,
			data: {
				ageRange: details.ageRange,
				weekInviteTag: details.weekInviteTag,
				identity: details.identity,
				focusPerson: details.focusPerson,
				personStatus: details.personStatus,
				note: details.note
			}
		}
		return useSheepApi.editSheep.api(payload)
	},
	onSuccess: () => {
		state.value.status.editDrawer = false
		message.info('更新成功')
	},
	onSettled: async () => await queryClient.invalidateQueries({
		queryKey: [useSheepApi.getUserAndDistrictSheep.queryKey]
	})
})

// * 刪除
const { mutate: handleDeleteSheep } = useMutation({
	mutationFn: () => useSheepApi.deleteSheep.api(state.value.data.details._id),
	onSuccess: () => state.value.status.editDrawer = false,
	onSettled: async () => await queryClient.invalidateQueries({
		queryKey: [useSheepApi.getUserAndDistrictSheep.queryKey]
	})
})

// * 確定刪除
const handlePositiveClick = () => {
	handleDeleteSheep()
	message.info('刪除成功')
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
            size="small"
            :bordered="false"
            :single-line="false"
            :columns="personalColumns()"
            :data="handleSheepList?.data.personal"
          />
        </n-tab-pane>
        <n-tab-pane
          name="district"
          tab="區裡名單"
        >
          <n-data-table
            :row-props="onRowClick"
            size="small"
            :bordered="false"
            :single-line="false"
            :columns="districtColumns()"
            :data="handleSheepList?.data.district"
          />
        </n-tab-pane>
      </n-tabs>
    </n-space>
    <!--
      可以編輯 Drawer
    -->
    <n-drawer
      v-model:show="state.status.editDrawer"
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
            @negative-click="message.info('取消刪除')"
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
    <!--
      不可以編輯 Drawer
    -->
    <n-drawer
      v-model:show="state.status.viewDrawer"
      default-height="600px"
      placement="bottom"
    >
      <n-drawer-content
        :title="state.data.details?.name"
        closable
      >
        <p>年齡: {{ ageRangeToText(state.data.details?.ageRange as AgeRange) }}</p>
        <p>身份: {{ identityToText(state.data.details?.identity) }}</p>
        <p>狀態: {{ personStatusToText(state.data.details?.personStatus as PersonStatus) }}</p>
        <p>這週邀約請形:</p>
        <div>
          <n-tag
            v-for="tag in state.data.details?.weekInviteTag"
            :key="tag"
            type="primary"
          >
            {{ tag }}
          </n-tag>
        </div>
        <p>備註: </p>
        <p>{{ state.data.details?.note }}</p>
      </n-drawer-content>
    </n-drawer>
    <AddSheepBtnComponent />
  </div>
</template>

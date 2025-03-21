<script setup lang='ts'>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { Add } from '@vicons/ionicons5'
import { NFloatButton, NIcon, NForm, NFormItem, NInput, NButton, NDrawer, NDrawerContent, NSelect, NCard } from 'naive-ui'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'

import { useSheepApi } from '@/hook'
import { AgeRange, ageRangeOptions, Identity, identityOptions } from '@/types'

const queryClient = useQueryClient()
const addFormRef = ref<FormInst | null>(null)
const message = useMessage()
const state = ref({
	data: {
		name: '',
		ageRange: AgeRange.teenager,
		identity: Identity.Male
	},
	status: {
		drawer: false
	}
})

const rules: FormRules = {
	name: [
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

const {
	mutate: handelAddSheep,
	isPending: isAddSheepPending
} = useMutation({
	mutationFn: () => useSheepApi.createSheep.api(state.value.data),
	onSuccess: (data) => {
		if (data.response.data.errorCode === 'BAD_REQUEST_SAME_SHEEP'){
			message.error(`區內名單已經有[${state.value.data.name}]`)
			return
		}
	},
	onSettled: () =>  {
		queryClient.invalidateQueries({
			queryKey: [useSheepApi.getUserAndDistrictSheep.queryKey]
		})
		state.value.status.drawer = false
	}
})

</script>
<template>
  <div>
    <n-float-button
      :right="30"
      :bottom="30"
      @click="state.status.drawer = true"
    >
      <n-icon>
        <Add />
      </n-icon>
    </n-float-button>
    <n-drawer
      v-model:show="state.status.drawer"
      default-height="600px"
      placement="bottom"
    >
      <n-drawer-content
        title="新增"
        closable
      >
        <n-card class="mb-4">
          [注意] 只能新增來過會所的朋友
        </n-card>
        <n-form
          ref="addFormRef"
          :model="state.data"
          :rules="rules"
          size="small"
        >
          <n-form-item
            path="name"
            label="姓名"
          >
            <n-input
              v-model:value="state.data.name"
              placeholder="請輸入姓名"
            />
          </n-form-item>
          <n-form-item
            path="ageRange"
            label="年齡範圍"
          >
            <n-select
              v-model:value="state.data.ageRange"
              :options="ageRangeOptions"
            />
          </n-form-item>
          <n-form-item
            path="identity"
            label="身分"
          >
            <n-select
              v-model:value="state.data.identity"
              :options="identityOptions"
            />
          </n-form-item>
        </n-form>
        <n-button
          type="primary"
          :loading="isAddSheepPending"
          @click="handelAddSheep()"
        >
          新增
        </n-button>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang='ts'>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { Add } from '@vicons/ionicons5'
import { NFloatButton, NIcon, NForm, NFormItem, NInput, NButton, NDrawer, NDrawerContent, NSelect } from 'naive-ui'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'

import { Identity, identityOptions } from '@/enums'
import { AgeRange, ageRangeOptions } from '@/enums'
import { useSheepApi } from '@/hook'

const queryClient = useQueryClient()
const addFormRef = ref<FormInst | null>(null)

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
	onSuccess: () => state.value.status.drawer = false,
	onSettled: async () => await queryClient.invalidateQueries({
		queryKey: [useSheepApi.getSheepList.queryKey]
	})
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

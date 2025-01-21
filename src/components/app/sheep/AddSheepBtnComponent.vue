<script setup lang='ts'>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { NFloatButton, NIcon, NForm, NFormItem, NSelect, NButton, NDrawer, NDrawerContent } from 'naive-ui'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'

const addFormRef = ref<FormInst | null>(null)
const state = ref({
	data: {
		name: '',
		ageRange: ''
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

</script>

<template>
  <div>
    <n-float-button
      :right="0"
      :bottom="10"
      @click="state.status.drawer = true"
    >
      <n-icon>
        <CashIcon />
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
            :path="ageRange"
            label="年齡範圍"
          >
            <n-select
              v-model:value="state.data.ageRange"
              :options="ageRangeOptions"
            />
          </n-form-item>
        </n-form>
        <n-button
          type="primary"
        >
          更新
        </n-button>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

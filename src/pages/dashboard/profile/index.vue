<script setup lang='ts'>
import { MailOutline, PersonOutline } from '@vicons/ionicons5'
import { NH2, NCard, NText, NButton, NSpace, NIcon, NFlex } from 'naive-ui'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores'

const userStore = useUserStore()
const { getUser } = storeToRefs(userStore)

const handleVerifyEmail = () => {
	console.log('前往驗證')
}
</script>

<template>
  <div>
    <n-card title="個人資料">
      <template #header-extra>
        {{ getUser?.emailVerified ? '已驗證' : '未驗證' }}
      </template>
      <n-h2>{{ getUser?.name }}</n-h2>
      <n-space>
        <n-flex align="center">
          <n-icon size="16">
            <MailOutline />
          </n-icon>
          <n-text>{{ getUser?.email }}</n-text>
        </n-flex>
        <n-flex align="center">
          <n-icon size="">
            <PersonOutline />
          </n-icon>
          <n-text>{{ getUser?.role }}</n-text>
        </n-flex>
      </n-space>
      <template
        #action
        v-if="!getUser?.emailVerified"
      >
        <n-button
          type="primary"
          strong
          secondary
          block
          size="small"
          @click="handleVerifyEmail"
        >
          前往驗證
        </n-button>
      </template>
    </n-card>
  </div>
</template>

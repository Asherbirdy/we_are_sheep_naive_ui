<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query'
import { MailOutline, PersonOutline } from '@vicons/ionicons5'
import { NH2, NCard, NText, NButton, NSpace, NIcon, NFlex } from 'naive-ui'

import UpdateProfileBtnComponent from '@/components/app/profile/UpdateProfileBtnComponent.vue'
import { useUserApi } from '@/hook'
import { DashboardRoutes } from '@/types'

const router = useRouter()
const { data: handleGetUser } = useQuery({
	queryKey: [useUserApi.showMe.queryKey],
	queryFn: () => useUserApi.showMe.api()
})

</script>

<template>
  <n-space
    vertical
    justify="space-between"
  >
    <n-card title="個人資料">
      <template #header-extra>
        {{ handleGetUser?.user?.emailVerified ? '已驗證' : '未驗證' }}
      </template>
      <n-h2>{{ handleGetUser?.user?.name }}</n-h2>
      <n-space>
        <n-flex align="center">
          <n-icon size="16">
            <MailOutline />
          </n-icon>
          <n-text>{{ handleGetUser?.user?.email }}</n-text>
        </n-flex>
        <n-flex align="center">
          <n-icon size="">
            <PersonOutline />
          </n-icon>
          <n-text>{{ handleGetUser?.user?.role }}</n-text>
        </n-flex>
      </n-space>
      <template
        #action
        v-if="!handleGetUser?.user?.emailVerified"
      >
        <n-button
          type="primary"
          strong
          secondary
          block
          size="small"
          @click="router.push(DashboardRoutes.profileEmailVerify)"
        >
          前往驗證
        </n-button>
      </template>
    </n-card>
    <UpdateProfileBtnComponent />
  </n-space>
</template>

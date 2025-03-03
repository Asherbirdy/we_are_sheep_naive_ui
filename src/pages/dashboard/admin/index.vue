<script setup lang='ts'>
import { NButton } from 'naive-ui'

import { DashboardRoutes } from '@/types'

const router = useRouter()
const handleGoToSerialNumber = () => {
	router.push(DashboardRoutes.adminSerialNumber)
}

const handleGoToDistrict = () => {
	router.push(DashboardRoutes.adminDistrict)
}
const handleGoToUsers = () => {
	router.push(DashboardRoutes.adminUsers)
}
</script>
<template>
  <div>
    <n-button @click="handleGoToDistrict">
      District頁面
    </n-button>
    <n-button @click="handleGoToSerialNumber">
      SerialNumber頁面
    </n-button>
    <n-button @click="handleGoToUsers">
      Users頁面
    </n-button>
  </div>
</template>

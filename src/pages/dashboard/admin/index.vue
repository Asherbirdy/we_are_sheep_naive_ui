<script setup lang='ts'>
import { NButton } from 'naive-ui'

import { DashboardRoutes } from '@/enums'

const router = useRouter()
const handleGoToSerialNumber = () => {
	router.push(DashboardRoutes.adminSerialNumber)
}

const handleGoToDistrict = () => {
	router.push(DashboardRoutes.adminDistrict)
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
  </div>
</template>

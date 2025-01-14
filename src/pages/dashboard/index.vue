<script setup lang='ts'>
import { NH2, NH4 } from 'naive-ui'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores'

const userStore = useUserStore()
const { getUser } = storeToRefs(userStore)
</script>

<template>
  <div>
    <n-h2>{{ getUser?.name }}</n-h2>
    <n-h4>{{ getUser?.email }}</n-h4>
    <n-h4>{{ getUser?.role }}</n-h4>
    <n-h4>{{ getUser?.emailVerified }}</n-h4>
  </div>
</template>

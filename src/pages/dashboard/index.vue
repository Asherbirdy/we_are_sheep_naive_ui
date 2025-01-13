<script setup lang='ts'>
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/common/UserStore'

const userStore = useUserStore()
const { getUser } = storeToRefs(userStore)
</script>

<template>
  <div>{{ getUser }}</div>
</template>

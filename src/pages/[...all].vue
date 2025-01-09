<route lang="yaml">
  meta:
    layout: false
</route>
<script setup lang="ts">
import {
	NResult,
	NButton,
	NSpace,
	NImage
} from 'naive-ui'

import { Routes } from '@/enums'

const router = useRouter()
</script>
<template>
  <n-space
    vertical
    justify="center"
    align="center"
    class="h-full"
    style="height: 78dvh"
  >
    <n-image
      width="150"
    />
    <n-result
      title="404 Not Found"
      description="你知道這頁不存在嗎？"
      class="bg-gray-100 p-15 border-rd"
    >
      <template #footer>
        <n-button
          type="primary"
          @click="router.push(Routes.login)"
        >
          回首頁吧
        </n-button>
      </template>
    </n-result>
  </n-space>
</template>
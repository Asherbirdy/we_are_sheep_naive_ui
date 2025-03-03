<script setup lang="ts">
import { NLayout, NLayoutHeader, NSpace, NFlex, NP } from 'naive-ui'

import MenubarComponent from '@/components/common/MenubarComponent.vue'
import { DashboardRoutes } from '@/types'
const router = useRouter()

const clicks = ref(0)
const handleGoToAdmin = () => {
	clicks.value++
	if (clicks.value === 5) {
		router.push(DashboardRoutes.admin)
		clicks.value = 0
	}
}
</script>

<template>
  <div>
    <n-layout content-style="padding: 24px;">
      <n-layout-header>
        <n-space
          justify="space-between"
          align="center"
        >
          <n-p
            width="150"
            @click="handleGoToAdmin"
          >
            測試環境
          </n-p>
          <n-flex
            justify="space-between"
            align="center"
          >
            <LocalePopselectComponent />
            <MenubarComponent />
          </n-flex>
        </n-space>
      </n-layout-header>
    </n-layout>
    <n-layout has-sider>
      <SidebarComponent class="md:block hidden" />
      <n-space
        vertical
        class="w-full m-4"
      >
        <router-view
          v-slot="{ Component }"
          style="height: calc(100dvh - 114px);"
        >
          <transition
            name="pagefade"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </n-space>
    </n-layout>
  </div>
</template>
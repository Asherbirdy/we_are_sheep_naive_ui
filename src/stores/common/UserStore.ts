import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { UserInfoData } from '@/types'

export const useUserStore = defineStore('userStore', () => {
  // State
  const state = ref<UserInfoData | null>(null)

  // Getters
  const getUser = computed(() => state.value)

  // Actions
  const setUser = (user: UserInfoData) => {
    state.value = user
  }

  const clearUser = () => {
    state.value = null
  }

  return {
    state,
    getUser,
    setUser,
    clearUser
  }
}, {
  persist: {
    key: 'user-store',
    storage: localStorage
  }
})
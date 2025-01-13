import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  // State
  const state = ref()

  // Getters
  const getUser = computed(() => state.value)

  // Actions
  const setUser = (user: any) => {
    state.value = user
  }

  return {
    state,
    getUser,
    setUser
  }
}, {
  persist: {
    key: 'user-store',
    storage: localStorage
  }
})
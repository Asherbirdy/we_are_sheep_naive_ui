import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  //  State
  const state = ref()
  //  Getters

  const getUser = computed(() => state.value)
  // Actions
  const setUser = (user: any) => {
    state.value = user
  }
  return {
    getUser,
    setUser
  }
})
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuStore', () => {
  //  State
  const state = ref()
  //  Getters

  const getMenu = computed(() => state.value)
  // Actions

  return {
    getMenu
  }
})
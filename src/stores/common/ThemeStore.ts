import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import { defineStore } from 'pinia'
import type { ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'

interface ThemeState {
  themeMode: GlobalTheme | null
}

interface ThemeStore {
  getThemeMode: ComputedRef<GlobalTheme | null>
  handleSetupThemeMode: ()=> void
  handleChangeThemeMode: ()=> void
  handleSetupLocales: ()=> void
  handleChangeLocales: (locales: string)=> void
}

export const useThemeStore = defineStore('themeStore', (): ThemeStore => {
  //  State
  const state = ref<ThemeState>({ themeMode: null })
  const { locale } = useI18n()

  //  Getters
  const getThemeMode = computed(() => state.value.themeMode)

  // Actions
  /*
    * 初始化主題
  */
  const handleSetupThemeMode = () => {
    const getLocalTheme = window.localStorage.getItem('themeMode')
    const localTheme = getLocalTheme ? JSON.parse(getLocalTheme) : null

    if (!localTheme || localTheme === 'light') {
      state.value.themeMode = null
      return
    }

    state.value.themeMode = darkTheme
  }

  /*
    * 改變主題 - 一般 或 暗色模式
  */
  const handleChangeThemeMode = () => {
    if (!getThemeMode.value) {
      window.localStorage.setItem('themeMode', JSON.stringify('dark'))
      state.value.themeMode = darkTheme
      return
    }
    window.localStorage.setItem('themeMode', JSON.stringify('light'))
    state.value.themeMode = null
  }

  /*
    * 初始化 語系
  */
  const handleSetupLocales = () => {
    const getLocalLocales = window.localStorage.getItem('locales')
    const localLocales = getLocalLocales ? JSON.parse(getLocalLocales) : 'zh-TW'

    locale.value = localLocales
  }
  /*
    * 改變語系儲存至 LocalStorage
  */
  const handleChangeLocales = (locales: string) => {
    locale.value = locales
    window.localStorage.setItem('locales', JSON.stringify(locales))
  }

  return {
    getThemeMode,
    handleSetupThemeMode,
    handleChangeThemeMode,
    handleSetupLocales,
    handleChangeLocales
  }
})
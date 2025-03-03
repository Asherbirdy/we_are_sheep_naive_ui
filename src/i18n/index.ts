import { createI18n } from 'vue-i18n'

import en from './en-US.json'
import zhTW from './zh-TW.json'
import { i18n } from '@/types'

type MessageSchema = typeof zhTW

export default createI18n<[MessageSchema], i18n>({
  legacy: false,
  locale: i18n.zhTW,
  fallbackLocale: i18n.en,
  messages: {
    en,
    'zh-TW': zhTW
  }
})

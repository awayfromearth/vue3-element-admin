import { createI18n } from 'vue-i18n'
import enLocale from './package/en'
import zhCnLocale from './package/zh-cn'

const messages = {
  'zh-cn': {
    ...zhCnLocale
  },
  en: {
    ...enLocale
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh-cn',
  messages
})

export default i18n
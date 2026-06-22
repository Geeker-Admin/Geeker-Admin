import { createI18n } from 'vue-i18n'
import { getBrowserLang } from '@/utils'

import zh from './zh.json'
import en from './en.json'

const i18n = createI18n({
  allowComposition: true,
  legacy: false,
  locale: getBrowserLang(),
  messages: { zh, en },
})

const { availableLocales, t } = i18n.global

export const localeMapping = {
  zh: '简体中文',
  en: 'English',
} as const

for (const locale of availableLocales) {
  if (!localeMapping[locale as keyof typeof localeMapping]) {
    // oxlint-disable-next-line no-console
    console.warn(t(`error.localeNotSupported`, { locale }))
  }
}

export default i18n

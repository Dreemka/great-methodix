import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ru from '../locales/ru.json'

const browserLocale = navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en'

export const i18n = createI18n({
  legacy: false,
  locale: browserLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    ru,
  },
})


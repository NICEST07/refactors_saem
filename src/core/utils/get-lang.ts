import { locales } from '@src/config/i18n/routing'
import { getLocale } from 'next-intl/server'

export async function getLang () {
  try {
    if (typeof window === 'undefined') {
      return await getLocale()
    }

    const cookies = document.cookie.split(';')

    let lang
    for (const cookie of cookies) {
      if (cookie.startsWith('NEXT_LOCALE')) {
        lang = cookie.split('=')[1]
        return lang
      }
    }

    return locales.includes(lang as any) ? lang : locales[0]
  } catch (error) {
    return locales[0]
  }
}

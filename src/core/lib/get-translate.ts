import { createTranslator } from 'next-intl'
import { getLang } from '../utils/get-lang'
import { getMessages } from '@src/config/i18n/request'

export async function getTranslate () {
  const locale = await getLang() ?? 'es'

  const messages = await getMessages(locale)

  return createTranslator({ locale, messages })
}

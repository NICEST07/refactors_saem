import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export const getMessages = async (locale: string) => {
  const messages = {
    auth: (await import(`../../assets/languages/${locale}/auth.json`)).default,
    common: (await import(`../../assets/languages/${locale}/common.json`)).default,
    errors: (await import(`../../assets/languages/${locale}/errors.json`)).default
  }

  return messages
}

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid

  if (!routing.locales.includes(locale as any)) notFound()

  const messages = await getMessages(locale)

  return { messages }
})

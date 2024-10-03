import { useTranslations } from 'next-intl'

export function useErrorTranslation () {
  const t = useTranslations('errors')

  return (code?: string) => {
    return t(code ?? 'DEFAULT')
  }
}

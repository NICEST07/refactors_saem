import { getTranslate } from '../lib/get-translate'

export const getMessageError = async (errorCode?: string): Promise<string> => {
  const t = await getTranslate()

  return t(`errors.${errorCode ?? 'DEFAULT'}`)
}

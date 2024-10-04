import { AxiosError } from 'axios'
import { getMessageError } from '@src/core/utils/get-error-api'
import type { ErrorService } from '../models/error'

export async function returnError (error: unknown): Promise<ErrorService> {
  if (error instanceof AxiosError) return { success: false, error: error.response?.data?.errorsForm ?? await getMessageError(error?.code) }
  if (error instanceof Error) return { success: false, error: error.message }
  return { success: false, error: await getMessageError('DEFAULT') }
}

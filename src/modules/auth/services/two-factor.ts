import { GlobalInterceptor } from '@src/core/interceptors'
import type { ServicesResponse } from '@src/core/models/services-response'
import { AxiosError } from 'axios'

export async function resendEmailCode (token: string | null) {
  try {
    const { data } = await GlobalInterceptor.get<ServicesResponse>('/login/forward-email', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!data.success) throw new Error(data.errorsForm)
    return data
  } catch (error) {
    if (error instanceof AxiosError) return { success: false, errorsForm: error?.response?.data?.errorsForm ?? 'An error occurred while sending the email code.' }
    if (error instanceof Error) return { success: false, errorsForm: error.message }
    return { success: false, errorsForm: 'An error occurred while sending the email code.' }
  }
}

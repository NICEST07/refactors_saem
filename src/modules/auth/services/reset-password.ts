import { GlobalInterceptor } from '@src/core/interceptors'
import { ServicesResponse } from '@src/core/models/services-response'
import { returnError } from '../utils/return-error'

interface ResetResponse extends ServicesResponse {
  success: true
  token: string
}

interface ResetPasswordProps {
  password: string
  tokenCaptcha: string | undefined
  token: string | null
}

export async function resetPasswordService ({ password, tokenCaptcha, token }: ResetPasswordProps) {
  try {
    const { data } = await GlobalInterceptor.post<ResetResponse>('/review-profile/update-password', { password, tokenCaptcha }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!data.success) throw new Error(data?.errorsForm)
    return data
  } catch (error) {
    return await returnError(error)
  }
}

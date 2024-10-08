import type { ServicesResponse } from '@src/core/models/services-response'
import type { ResendEmailCodeResponse, ValidateCodeProps, ValidateCodeResponse } from '../models/two-factor'
import { GlobalInterceptor } from '@src/core/interceptors'
import { returnError } from '../utils/return-error'
import type { ErrorService } from '../models/error'

export async function resendEmailCode (token: string | null): Promise<ResendEmailCodeResponse> {
  try {
    const { data } = await GlobalInterceptor.get<ServicesResponse>('/login/forward-email', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!data.success) throw new Error(data.errorsForm)
    return { success: true, message: data?.errorsForm ?? '' }
  } catch (error) {
    const response = await returnError(error)
    return response
  }
}

export const adapter2factor = (data: ValidateCodeResponse) => ({
  success: true as const,
  errorsForm: data.errorsForm,
  token: data.token,
  failConfig: data.failConfig
})

export async function validateCode ({ code, method, tokenCaptcha, token }: ValidateCodeProps): Promise<ReturnType<typeof adapter2factor> | ErrorService> {
  try {
    const { data } = await GlobalInterceptor.post<ValidateCodeResponse>('/login/validate2fa', {
      code,
      method: method.toLocaleLowerCase(),
      tokenCaptcha
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!data.success) throw new Error(data.errorsForm)
    return adapter2factor(data)
  } catch (error) {
    return await returnError(error)
  }
}

import { type LoginValues } from '../schemas/login'
import { type ServicesResponse } from '@src/core/models/services-response'
import { GlobalInterceptor } from '@src/core/interceptors'
import { AxiosError } from 'axios'
import { getIPUser } from '@src/core/services/get-ip'
import { getMessageError } from '@src/core/utils/get-error-api'
import { ErrorService } from '../models/error'
import { AuthError } from '../errors'

export interface LoginServiceResponse extends ServicesResponse {
  securityMail: `${string}@${string}`
  token: string
  typesAuth: ['GOOGLE', 'MAIL']
  message?: string
}

export interface LoginServiceProps extends LoginValues {
  ip: string
  tokenCaptcha: string
}

export const adaptLoginService = (data: LoginServiceResponse) => ({
  success: true as const,
  token: data.token,
  userMail: data.securityMail,
  methoAuths: data.typesAuth
})

interface LoginSuccess extends ReturnType<typeof adaptLoginService> {}

type LoginResult = ErrorService | LoginSuccess

export async function loginUser (dataForm: LoginValues, tokenCaptcha: string): Promise<LoginResult> {
  try {
    const ip = await getIPUser()
    const { data } = await GlobalInterceptor.post<LoginServiceResponse>('/login/user-validation', {
      ...dataForm,
      tokenCaptcha,
      ip
    })
    if (!data.success) throw new AuthError(data?.errorsForm ?? 'Error')
    return adaptLoginService(data)
  } catch (error) {
    // if (error instanceof AxiosError) return { success: false, error: error.response?.data?.errorsForm ?? await getMessageError(error?.code) }
    // if (error instanceof AuthError) return { success: false, error: error.message }
    return { success: false, error: await getMessageError('ERR_NETWORK') }
  }
}

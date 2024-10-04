import type { LoginValues } from '../schemas/login'
import type { LoginUserReturn, LoginServiceResponse } from '../models/login'
import { GlobalInterceptor } from '@src/core/interceptors'
import { getIPUser } from '@src/core/services/get-ip'
import { returnError } from '../utils/return-error'

export const adaptLoginService = (data: LoginServiceResponse) => ({
  success: true as const,
  token: data.token,
  userMail: data.securityMail,
  methoAuths: data.typesAuth
})

export async function loginUser (dataForm: LoginValues, tokenCaptcha: string): Promise<LoginUserReturn> {
  try {
    const ip = await getIPUser()
    const { data } = await GlobalInterceptor.post<LoginServiceResponse>('/login/user-validation', {
      ...dataForm,
      tokenCaptcha,
      ip
    })
    if (!data.success) throw new Error(data?.errorsForm)
    return adaptLoginService(data)
  } catch (error) {
    const errorMessage = await returnError(error)
    return errorMessage
  }
}

import type { ServicesResponse } from '@src/core/models/services-response'
import type { LoginValues } from '../schemas/login'
import type { adaptLoginService } from '../services/login'
import type { ErrorService } from './error'

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

interface LoginSuccess extends ReturnType<typeof adaptLoginService> { }

export type LoginUserReturn = ErrorService | LoginSuccess

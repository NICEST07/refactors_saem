import type { ServicesResponse } from '@src/core/models/services-response'
import type { TwoFactorValues } from '../schemas/two-factor'
import { ErrorService } from './error'

export interface FailConfig {
  resetPass?: boolean
  otpKey?: boolean
}

export interface ValidateCodeResponse extends ServicesResponse {
  token: string
  failConfig: FailConfig
}

export interface ValidateCodeProps extends TwoFactorValues {
  tokenCaptcha: string
  token: string | null
}

export interface ReSendCode {
  success: true
  message: string
}

export type ResendEmailCodeResponse = ErrorService | ReSendCode

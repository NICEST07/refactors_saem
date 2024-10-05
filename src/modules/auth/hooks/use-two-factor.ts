import type { TwoFactorValues } from '../schemas/two-factor'
import { useRef } from 'react'
import { useToken } from '../context/token'
import { METHODSAUTH } from '../constants/methods-auth'
import { toast } from 'sonner'
import { resendEmailCode, validateCode } from '../services/two-factor'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useFailConfig } from './use-fail-config'
import { useLoginContext } from '../context/login'
import { STEPS_LOGIN } from '../constants/views'
import { useStepFlow } from '@src/core/components/step-flow'

export function useTwoFactor () {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const redirectStep = useFailConfig()
  const { token, setToken } = useToken()
  const { setStep } = useStepFlow()
  const { setFailConfig, methoAuths, userMail, reset } = useLoginContext()
  const isEmailSent = useRef(false)

  const handleSendMailCode = async () => {
    const res = await resendEmailCode(token)
    if (!res.success) {
      toast.error(res.error)
      return
    }
    toast.success(res.message)
  }

  const firstSendEmail = async (value: 'MAIL' | 'GOOGLE') => {
    if (methoAuths?.[0] === METHODSAUTH.MAIL) return // Validamos que no venga por determinado
    if (isEmailSent.current || value !== METHODSAUTH.MAIL) return // validamos que no se envie el correo por primera vez
    isEmailSent.current = true
    await handleSendMailCode()
  }

  const onSubmit = async (data: TwoFactorValues) => {
    const tokenCaptcha = await executeRecaptcha?.('TWOFACTOR') ?? ''
    const res = await validateCode({ ...data, tokenCaptcha, token })
    if (!res.success) return toast.error(res.error)
    setToken(res.token)
    setFailConfig(res.failConfig)
    redirectStep(res.failConfig)
  }

  const handleCancel = () => {
    setStep(STEPS_LOGIN.LOGIN)
    reset()
  }

  return { onSubmit, handleSendMailCode, firstSendEmail, methoAuths, userMail, handleCancel }
}

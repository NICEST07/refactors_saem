import { FailConfig } from '../models/two-factor'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useToken } from '../context/token'
import { useStepFlow } from '@src/core/components/step-flow'
import { STEPS_LOGIN } from '../constants/views'
import { useRouter } from '@src/config/i18n/routing'
import { createSession } from '../helpers/create-session'

// Determina si se debe ser redireccionado a un paso específico
// Si no se debe, crea la session y redirige a la ruta de callback o dashboard

export function useFailConfig () {
  const t = useTranslations('auth.twofactor')
  const { token } = useToken()
  const { setStep } = useStepFlow()
  const router = useRouter()

  const handleFailConfig = async ({ otpKey = false, resetPass = false }: FailConfig) => {
    if (resetPass) {
      toast.error(t('warnings.resetPass'))
      setStep(STEPS_LOGIN.RESETPASSWORD)
      return
    }

    if (otpKey) {
      toast.error(t('warnings.otpKey'))
      setStep(STEPS_LOGIN.ADDGOOGLEAUTH)
      return
    }

    const url = await createSession(token)
    router.push(url)
  }

  return handleFailConfig
}

import { useRef } from 'react'
import { useToken } from '../context/token'
import { METHODSAUTH, type TypeMethodsAuth } from '../constants/methods-auth'
import { toast } from 'sonner'
import { resendEmailCode } from '../services/two-factor'
import { AxiosError } from 'axios'

type HandleActions = Record<TypeMethodsAuth, () => void>

export function useTwoFactor () {
  const { token } = useToken()
  const isEmailSent = useRef(false)

  const sendEmailCode = async () => {
    if (isEmailSent.current) return

    try {
      const response = await resendEmailCode(token)
      if (response.success) {
        toast.success(response.errorsForm)
        isEmailSent.current = true
      }
    } catch (error) {
      if (error instanceof AxiosError) toast.error(error || 'An error occurred while sending the email code.')
      toast.error(error.message || 'An error occurred while sending the email code.')
    }
  }

  const handleActions: HandleActions = {
    [METHODSAUTH.MAIL]: sendEmailCode,
    [METHODSAUTH.GOOGLE]: () => null
  }

  return { handleActions }
}

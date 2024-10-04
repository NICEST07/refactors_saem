import { useRef } from 'react'
import { useToken } from '../context/token'
import { METHODSAUTH, type TypeMethodsAuth } from '../constants/methods-auth'
import { toast } from 'sonner'
import { resendEmailCode } from '../services/two-factor'

type HandleActions = Record<TypeMethodsAuth, () => void>

export function useTwoFactor () {
  const { token } = useToken()
  const isEmailSent = useRef(false)

  const sendEmailCode = async () => {
    if (isEmailSent.current) return
    const res = await resendEmailCode(token)
    if (!res.success) return toast.error(res.error)
    toast.success(res.message)
    isEmailSent.current = true
  }

  const handleActions: HandleActions = {
    [METHODSAUTH.MAIL]: sendEmailCode,
    [METHODSAUTH.GOOGLE]: () => null
  }

  return { handleActions }
}

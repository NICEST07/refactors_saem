'use client'
import type { FailConfig } from '../models/two-factor'
import { createContext, useContext } from 'react'

export interface LoginState {
  userMail: `${string}@${string}` | null
  methoAuths: ['GOOGLE', 'MAIL'] | [] | null
  failConfig: FailConfig | null
}

export interface SetTwoFactor {
  userMail: LoginState['userMail']
  methoAuths: LoginState['methoAuths']
}

export interface LoginActions {
  setTwoFactor: ({ methoAuths, userMail }: SetTwoFactor) => void
  setFailConfig: (failConfig: FailConfig) => void
  reset: () => void
}

export const LoginContext = createContext<LoginActions & LoginState | null>(null)

export function useLoginContext () {
  const context = useContext(LoginContext)
  if (context == null) {
    throw new Error('useLoginContext must be used within a LoginContextProvider')
  }
  return context
}

'use client'

import { useState } from 'react'
import { LoginContext, type LoginState, type SetTwoFactor } from '../context/login'

const INITIAL_STATE: LoginState = {
  userMail: null,
  methoAuths: [],
  failConfig: null
}

export function LoginProvider ({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LoginState>(INITIAL_STATE)

  const setTwoFactor = ({ methoAuths, userMail }: SetTwoFactor) => {
    if (methoAuths?.length === 0 || userMail === null) return
    setState((prev) => ({
      ...prev,
      userMail,
      methoAuths
    }))
  }

  const setFailConfig = (failConfig: LoginState['failConfig']) => {
    if (failConfig === null) return
    setState((prev) => ({
      ...prev,
      failConfig
    }))
  }

  const reset = () => {
    setState({
      userMail: null,
      methoAuths: [],
      failConfig: null
    })
  }

  return (
    <LoginContext.Provider value={{
      ...state,
      setTwoFactor,
      setFailConfig,
      reset
    }}
    >
      {children}
    </LoginContext.Provider>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { TokenContext } from '../context/token'

export function TokenProvider ({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token != null && token !== '') {
      setToken(token)
    }
  }, [])

  const handleToken = (token: string) => {
    if (token === '') return
    setToken(token)
    localStorage.setItem('token', token)
  }
  const reset = () => {
    setToken('')
    localStorage.removeItem('token')
  }

  return (
    <TokenContext.Provider value={{ token, setToken: handleToken, reset }}>
      {children}
    </TokenContext.Provider>
  )
}

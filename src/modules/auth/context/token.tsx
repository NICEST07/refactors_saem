'use client'
import { createContext, useContext } from 'react'

interface TokenContextType {
  token: string
  setToken: (token: string) => void
}

export const TokenContext = createContext<TokenContextType>({
  token: '',
  setToken: () => {}
})

export function useToken () {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider')
  }
  return context
}

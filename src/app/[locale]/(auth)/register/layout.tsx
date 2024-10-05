import { TokenProvider } from '@src/modules/auth/providers/token'

export default function RegisterLayout ({ children }: { children: React.ReactNode }) {
  return (
    <TokenProvider>
      {children}
    </TokenProvider>
  )
}

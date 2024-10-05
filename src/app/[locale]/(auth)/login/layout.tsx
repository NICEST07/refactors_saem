import { LoginProvider } from '@src/modules/auth/providers/login'
import { TokenProvider } from '@src/modules/auth/providers/token'

export default function LoginLayout ({ children }: { children: React.ReactNode }) {
  return (
    <TokenProvider>
      <LoginProvider>
        {children}
      </LoginProvider>
    </TokenProvider>
  )
}

import { LoginProvider } from '@src/modules/auth/providers/login'

export default function LoginLayout ({ children }: { children: React.ReactNode }) {
  return (
    <LoginProvider>
      {children}
    </LoginProvider>
  )
}

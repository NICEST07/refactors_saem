import { BrandLogo } from '@src/core/components/brand-logo'
import { ReCaptchaProvider } from '@src/modules/auth/providers/re-captcha'
import { TokenProvider } from '@src/modules/auth/providers/token'
import { Toaster } from 'sonner'

export default function AuthLayout ({ children }: { children: React.ReactNode }) {
  return (
    <ReCaptchaProvider>
      <main className='fixed w-screen bg-palette-background-secondary h-screen grid items-center justify-items-center'>
        <section className='w-full max-w-[95%] min-h-[80dvh] 2xl:max-w-7xl xl:max-w-5xl xl:min-h-[80%] bg-palette-background-primary shadow-2xl rounded-2xl overflow-hidden overflow-y-auto sm:grid sm:grid-cols-2 flex flex-col justify-center items-center'>
          <div className='max-w-[280px] sm:max-w-sm justify-self-center p-6 grid place-content-center'>
            <BrandLogo />
          </div>
          <div className='w-full grid px-4'>
            <TokenProvider>
              {children}
            </TokenProvider>
          </div>
        </section>
      </main>
      <Toaster richColors position='top-center' />
    </ReCaptchaProvider>
  )
}

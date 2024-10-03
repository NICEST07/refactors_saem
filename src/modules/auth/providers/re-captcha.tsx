'use client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export function ReCaptchaProvider ({ children }: { children: React.ReactNode }) {
  if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY == null) {
    throw new Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set')
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}

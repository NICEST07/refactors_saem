import type { Metadata } from 'next'
import { roboto } from '@src/assets/fonts'
import { NextAuthProvider } from '@src/core/providers/next-auth'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '@src/assets/globals.css'

export const metadata: Metadata = {
  title: 'Saem',
  description: 'SMS, Envíe mensajes de texto,mensajes de audio IVR o Mail masivos a sus campañas de cobro, publicitarias,de recordatorios, alertas y promociones desde nuestra plataforma web.',
  authors: [{ name: 'Saem', url: 'https://saemcolombia.com.co' }],
  keywords: 'SMS, mensajes, masivos,masivo,comprar,paquetes,colombia,ivr,mali,voip',
  generator: 'Equipo saem colombia'
  // openGraph: {
  //   images: ['https://saemcolombia.com.co/images/logo.png'], //! CAMBIAR
  //   type: 'website',
  //   url: 'https://saemcolombia.com.co',
  //   title: 'Saem',
  //   description: 'SMS, Envíe mensajes de texto,mensajes de audio IVR o Mail masivos a sus campañas de cobro, publicitarias,de recordatorios, alertas y promociones desde nuestra plataforma web.'
  // }
}

export default async function LocaleLayout ({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={roboto.className}>
        <NextAuthProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}

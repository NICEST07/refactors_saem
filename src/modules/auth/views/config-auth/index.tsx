'use client'

import { useTranslations } from 'next-intl'
import { useFailConfig } from '../hooks/use-session-redirect'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Config2Factor, Config2FactorValues } from '../schemas/config-2factor'
import { Form } from '@src/core/components/ui/form'
import Image from 'next/image'
import { InputController } from '@src/core/components/fields-controls/input'
import { Button } from '@src/core/components/ui/button'
import useSWR from 'swr'
import { getQRGoogleAuth } from '@src/core/services/google/get-qr-google-auth'
import { useAuthStore } from '../stores/auth'
import { Loader } from 'lucide-react'
import { DeviceType, useDeviceType } from '@src/core/hooks/use-device-type'
import { validateQRCode } from '../services/config-2factor'
import { toast } from 'sonner'
import { useToken } from '../../context/token'

export const urlDowload = (userOs: DeviceType) => {
  const OS = {
    desktop: 'https://chrome.google.com/webstore/detail/authenticator/bhghoamapcdpbohphigoooaddinpkbai?utm_source=ext_sidebar&hl=es-419',
    android: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pcampaignid=web_share',
    phone: 'https://apps.apple.com/co/app/google-authenticator/id388497605'
  }

  return OS[userOs] ?? OS.desktop
}

export function AuthQRCodeForm () {
  const t = useTranslations('loginPage.addGoogleAuth')
  const { token } = useToken()
  const { data, error, isLoading } = useSWR('/get-qr-auth', async () => await getQRGoogleAuth('register', token))
  const userOs = useDeviceType()
  const redirect = useFailConfig()

  const { executeRecaptcha } = useGoogleReCaptcha()

  const form = useForm({
    resolver: zodResolver(Config2Factor),
    defaultValues: {
      code: ''
    }
  })

  const onSubmit = async (values: Config2FactorValues) => {
    const tokenCaptcha = await executeRecaptcha?.('ADDGOOGLEAUTH')
    try {
      await validateQRCode({ ...values, tokenCaptcha }, token)
      redirect({})
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  return (
    <Form {...form}>
      <form className='w-full h-full pb-2 flex flex-col justify-center gap-8 dark:text-white px-3' onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <header className='flex gap-2 flex-wrap'>
          <picture className='relative w-full max-w-[200px] min-h-[200px] flex items-center justify-center'>
            <img
              alt='QR Google authenticator'
              className='object-cover'
              src={`${(!isLoading && error == null) ? data : '/qr_loading.png'}`}
            />
            {isLoading && <Loader className='animate-spin absolute text-palette-primary w-8 h-8' />}
          </picture>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <Image src='/logos/googleauth.svg' className='w-16 h-16' width={60} height={60} alt='Logo de google authenticator' />
              <h1 className='text-xl font-bold'>{t('title')}</h1>
            </div>
            <div className='ml-2'>
              <ul>
                <li>1. <a href={urlDowload(userOs)} target='_blank' rel='noreferrer' className='text-palette-primary hover:underline'>{t('list.one')}</a></li>
                <li>2. {t('list.two')}</li>
                <li>3. {t('list.three')}</li>
              </ul>
            </div>
          </div>
        </header>
        <InputController
          control={form.control}
          name='code'
          type='number'
          placeholder={t('code')}
          className='flex h-14 justify-center items-center px-3 rounded-full bg-palette-background-secondary border-0 overflow-hidden'
        />
        <Button
          disabled={form.formState.isSubmitting}
          className='uppercase rounded-full border mt-5'
          size='xl'
        >
          {t('submit')}
        </Button>
      </form>
    </Form>
  )
}

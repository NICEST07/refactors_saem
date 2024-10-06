'use client'
import { type ResetPassValues, resetPasswordSchema } from '../../schemas/reset-password'
import { useTranslations } from 'next-intl'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { InputController } from '@src/core/components/fields-controls/input'
import { Button } from '@src/core/components/ui/button'
import { Form } from '@src/core/components/ui/form'
import { toast } from 'sonner'
import { useToken } from '../../context/token'
import { useLoginContext } from '../../context/login'
import { PasswordToggle } from '@src/core/components/ui/pass-toggle'
import { useFailConfig } from '../../hooks/use-fail-config'
import { resetPasswordService } from '../../services/reset-password'
import { WrapperIcon } from '../../components/wrapper-icon'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'

const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
  e.preventDefault()
}

export default function ResetPasswordForm () {
  const t = useTranslations('auth.resetPassword')
  const { setToken, token } = useToken()
  const { failConfig, setFailConfig } = useLoginContext()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })
  const redirect = useFailConfig()

  const onSubmit = async ({ password }: ResetPassValues) => {
    const tokenCaptcha = await executeRecaptcha?.('RESETPASSWORD')
    const res = await resetPasswordService({ password, tokenCaptcha, token })
    if (!res.success) return toast.error(res.error)
    setToken(res.token)
    const newFailConfig = { ...failConfig, resetPass: false }
    setFailConfig(newFailConfig)
    redirect(newFailConfig)
  }

  return (
    <Form {...form}>
      <form className='w-full max-w-lg grid px-1 gap-4 dark:text-white' onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <header className='text-2xl mb-10 text-center font-bold'>
          <h1>{t('title')}</h1>
        </header>

        <PasswordToggle
          renderInput={(type, setToggle) => (
            <WrapperIcon
              startIcon={<LockKeyhole className='text-palette-primary' />}
              endIcon={
                <Button
                  variant='ghost'
                  type='button'
                  onClick={setToggle}
                  aria-label={type === 'password' ? 'Hide password' : 'Show password'}
                  className='w-fit px-2 hover:bg-palette-primary/20 text-palette-primary text-xl rounded-full'
                >
                  {type === 'password' ? <Eye /> : <EyeOff />}
                </Button>
              }
            >

              <InputController
                name='password'
                control={form.control}
                autoComplete='username'
                type={type}
                placeholder={t('password')}
                onPaste={onPaste}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 border-none bg-transparent h-14 py-0'
              />
            </WrapperIcon>
          )}
        />
        <PasswordToggle
          renderInput={(type, setToggle) => (
            <WrapperIcon
              startIcon={<LockKeyhole className='text-palette-primary' />}
              endIcon={
                <Button
                  variant='ghost'
                  type='button'
                  onClick={setToggle}
                  aria-label={type === 'password' ? 'Hide password' : 'Show password'}
                  className='w-fit px-2 hover:bg-palette-primary/20 text-palette-primary text-xl rounded-full'
                >
                  {type === 'password' ? <Eye /> : <EyeOff />}
                </Button>
            }
            >
              <InputController
                name='confirmPassword'
                control={form.control}
                autoComplete='username'
                type={type}
                placeholder={t('confirmPassword')}
                onPaste={onPaste}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 border-none bg-transparent h-14 py-0'
              />
            </WrapperIcon>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          className='rounded-full uppercase' size='xl'
        >
          {t('submit')}
        </Button>
      </form>
    </Form>

  )
}

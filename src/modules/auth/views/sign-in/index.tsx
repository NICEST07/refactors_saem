'use client'
import { InputController } from '@src/core/components/fields-controls/input'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Eye, EyeOff, LockKeyhole, User } from 'lucide-react'
import { PasswordToggle } from '@src/core/components/ui/pass-toggle'
import { WrapperIcon } from '../../components/wrapper-icon'
import { useToken } from '../../context/token'
import { useLoginContext } from '../../context/login'
import { loginSchema, type LoginValues } from '../../schemas/login'
import { Form } from '@src/core/components/ui/form'
import { Button } from '@src/core/components/ui/button'
import { Separator } from '../../components/separator'
import Link from 'next/link'
import { loginUser } from '../../services/login'
import { toast } from 'sonner'
import { useStepFlow } from '@src/core/components/step-flow'
import { STEPS_LOGIN } from '../../constants/views'
import { useRouter } from '@src/config/i18n/routing'

export function LoginForm () {
  const { setToken } = useToken()
  const { setTwoFactor } = useLoginContext()
  const t = useTranslations('auth.logIn')
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: '',
      password: ''
    }
  })
  const { setStep } = useStepFlow()

  const { executeRecaptcha } = useGoogleReCaptcha()

  const router = useRouter()

  const onSubmit = async (formData: LoginValues) => {
    const tokenCaptcha = await executeRecaptcha?.('LOGIN') ?? ''
    const result = await loginUser(formData, tokenCaptcha)
    if (result.success) {
      const { methoAuths, token, userMail } = result
      setToken(token)
      setTwoFactor({ userMail, methoAuths })
      setStep(STEPS_LOGIN.TWOFACTOR)
    } else {
      toast.error(result.error, { position: 'top-center' })
    }
  }

  const isErrorUser = (form.formState.errors.user != null)
  const isErrorPass = (form.formState.errors.password != null)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4' noValidate>
        <WrapperIcon
          startIcon={<User className={`${isErrorUser ? 'text-error-600' : 'text-palette-primary'}`} />}
          className={`${isErrorUser ? 'bg-error border-error-600/10' : ''}`}
        >
          <InputController
            name='user'
            control={form.control}
            autoComplete='username'
            placeholder={t('username')}
            className='border-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0 bg-transparent h-14 py-0'
          />
        </WrapperIcon>
        <PasswordToggle
          renderInput={(type, setToggle) => (
            <WrapperIcon
              startIcon={<LockKeyhole className={`${isErrorPass ? 'text-error-600' : ''} text-palette-primary`} />}
              className={`${(form.formState.errors.password != null) ? 'bg-error border-error-600/10' : ''}`}
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
                className='focus-visible:ring-offset-0 focus-visible:ring-0 border-0 bg-transparent h-14 py-0'
              />
            </WrapperIcon>
          )}
        />
        <Link href='/forgot-password' type='button' className='text-palette-primary block px-2 text-base ml-auto hover:underline'>{t('forgotPass')}</Link>
        <Button
          disabled={form.formState.isSubmitting}
          className='rounded-full uppercase'
          size='xl'
          type='submit'
        >
          {t('submit')}
        </Button>
        <Separator />
        <Button
          disabled={form.formState.isSubmitting}
          variant='outline-secondary'
          type='button'
          onClick={() => router.push('/register')}
          className='uppercase rounded-full border h-12 bg-transparent'
        >
          {t('register')}
        </Button>
      </form>
    </Form>
  )
}

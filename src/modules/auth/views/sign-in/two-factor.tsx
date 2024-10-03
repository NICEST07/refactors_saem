'use client'
import { useTranslations } from 'next-intl'
import { useLoginContext } from '../../context/login'
import { useToken } from '../../context/token'
import { useRef } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useStepFlow } from '@src/core/components/step-flow'
import { useController, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { twoFactorSchema, TwoFactorValues } from '../../schemas/two-factor'
import { toast } from 'sonner'
import { Form } from '@src/core/components/ui/form'
import { METHODSAUTH } from '../../constants/methods-auth'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@src/core/components/ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '@src/core/components/ui/toggle-group'
import { GoogleIcon } from '../../icons/google'
import { EmailIcon } from '../../icons/email'
import { Label } from '@src/core/components/ui/label'
import { WrapperIcon } from '../../components/wrapper-icon'
import { InputController } from '@src/core/components/fields-controls/input'
import { Button } from '@src/core/components/ui/button'
import { Separator } from '../../components/separator'
import { ReSendCode } from '@src/core/components/re-send-code'

export function TwoFactorForm () {
  const t = useTranslations('loginPage.twofactor')
  const { token, setToken } = useToken()
  const { methoAuths, userMail, setFailConfig } = useLoginContext()
  const sendMail = useRef(false)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { setStep } = useStepFlow()

  const form = useForm({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      method: methoAuths?.[0] ?? '',
      code: ''
    }
  })
  const { field } = useController({ name: 'method', control: form.control })

  const redirect = useFailConfig()

  const onSubmit = async (data: TwoFactorValues) => {
    const tokenCaptcha = await executeRecaptcha?.('TWOFACTOR') ?? ''
    try {
      const res = await validateCode({ ...data, tokenCaptcha }, token)
      setToken(res.token)
      setFailConfig(res.failConfig)
      redirect(res.failConfig)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  const authDefault = form.watch('method', methoAuths?.[0] ?? METHODSAUTH.MAIL)
  const handleActions = (currentValue: string) => {
    const dicc: Record<string, () => void> = {
      [METHODSAUTH.MAIL]: () => {
        if (sendMail.current) return
        try {
          const data = await resendEmailCode(token)
          if (data.success === true) toast.success(data?.errorsForm)
          sendMail.current = true
        } catch (error: any) {
          toast.error(error?.message)
        }
      }
    }

    dicc[currentValue]?.()
  }

  return (
    <Form {...form}>
      <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <ToggleGroup
          value={field.value} type='single' onValueChange={(value) => {
            field.onChange(value)
            handleActions(value)
          }}
        >
          {methoAuths?.map((auth) => (
            <TooltipProvider key={auth}>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem
                    value={auth}
                    className={`${field.value === auth ? 'bg-palette-primary/20' : ''}
                        rounded-lg grid place-content-center w-16 h-16 text-5xl text-palette-primary hover:text-palette-primary hover:bg-palette-primary/30`}
                  >
                    {auth === METHODSAUTH.GOOGLE ? <GoogleIcon /> : <EmailIcon />}
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  {t(`tooltip.${auth.toLowerCase()}`)}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ToggleGroup>
        <div>
          <Label htmlFor='code' className='ml-2 dark:text-white'>
            {
              authDefault === METHODSAUTH.MAIL
                ? `${t('labelCode.email')} ${userMail}`
                : `${t('labelCode.google')}`
            }
          </Label>

          <WrapperIcon
            endIcon={
              authDefault === METHODSAUTH.MAIL && (
                <ReSendCode title={t('tooltip.reSendMail')} fetcher={async () => await resendEmailCode(token)} />
              )
            }
          >
            <InputController
              name='code'
              max={6}
              control={form.control}
              autoComplete='username'
              placeholder={t('inputCode')}
              type='number'
              className='focus-visible:ring-offset-0 focus-visible:ring-0 border-none bg-transparent h-14 py-0'
            />
          </WrapperIcon>
        </div>
        <Button disabled={form.formState.isSubmitting} className='rounded-full uppercase' size='xl'>
          {t('submit')}
        </Button>
        <Separator />
        <Button
          variant='outline-secondary'
          type='button'
          onClick={() => setStep(0)}
          className='uppercase rounded-full border h-12'
        >
          {t('link')}
        </Button>
      </form>
    </Form>
  )
}

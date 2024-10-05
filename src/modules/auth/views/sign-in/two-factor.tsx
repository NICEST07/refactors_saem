'use client'
import { useTranslations } from 'next-intl'
import { useController, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { twoFactorSchema } from '../../schemas/two-factor'
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
import { useTwoFactor } from '../../hooks/use-two-factor'
import { RectangleEllipsis } from 'lucide-react'
import { ConditionalRender } from '@src/core/components/conditional-render'

export default function TwoFactorForm () {
  const t = useTranslations('auth.twofactor')
  const { onSubmit, firstSendEmail, methoAuths, userMail, handleSendMailCode, handleCancel } = useTwoFactor()

  const form = useForm({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      method: methoAuths?.[0] ?? '',
      code: ''
    }
  })

  const { field } = useController({ name: 'method', control: form.control })

  return (
    <Form {...form}>
      <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <ToggleGroup
          value={field.value} type='single' onValueChange={(value: 'MAIL' | 'GOOGLE') => {
            field.onChange(value)
            firstSendEmail(value)
          }}
        >
          {methoAuths?.map((auth) => (
            <TooltipProvider key={auth}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem
                    value={auth}
                    className={`${field.value === auth ? 'bg-palette-primary/20' : ''}
                        rounded-lg grid place-content-center w-16 h-16 text-5xl text-palette-primary hover:text-palette-primary hover:bg-palette-primary/30`}
                  >
                    {auth === METHODSAUTH.GOOGLE ? <GoogleIcon /> : <EmailIcon />}
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  {t('methodAuth', { auth })}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ToggleGroup>
        <div>
          <Label htmlFor='code' className='ml-2 dark:text-white'>
            {t('label', { method: field.value, userMail })}
          </Label>

          <WrapperIcon
            startIcon={<RectangleEllipsis className='text-palette-primary' />}
            endIcon={
              <ConditionalRender shouldRender={field.value === METHODSAUTH.MAIL}>
                <ReSendCode
                  title={t('tooltip.reSendMail')}
                  fetcher={handleSendMailCode}
                />
              </ConditionalRender>
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
          onClick={handleCancel}
          className='uppercase rounded-full border h-12'
        >
          {t('back')}
        </Button>
      </form>
    </Form>
  )
}

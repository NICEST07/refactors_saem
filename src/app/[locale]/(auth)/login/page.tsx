import { StepFlowProvider, StepItem } from '@src/core/components/step-flow'
import { STEPS_LOGIN } from '@src/modules/auth/constants/views'
import { LoginForm } from '@src/modules/auth/views/sign-in'
import dynamic from 'next/dynamic'

const TwoFactor = dynamic(async () => await import('@src/modules/auth/views/sign-in/two-factor'))
const ResetPassword = dynamic(async () => await import('@src/modules/auth/views/sign-in/reset-password'))

export default function LoginPage () {
  return (
    <StepFlowProvider defaultValue={STEPS_LOGIN.RESETPASSWORD}>
      <StepItem value={STEPS_LOGIN.LOGIN}>
        <LoginForm />
      </StepItem>
      <StepItem value={STEPS_LOGIN.TWOFACTOR}>
        <TwoFactor />
      </StepItem>
      <StepItem value={STEPS_LOGIN.RESETPASSWORD}>
        <ResetPassword />
      </StepItem>
      <StepItem value={STEPS_LOGIN.ADDGOOGLEAUTH}>
        <h1>
          ADDGOOGLEAUTH
        </h1>
      </StepItem>
    </StepFlowProvider>
  )
}

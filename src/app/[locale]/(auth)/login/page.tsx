import { StepFlowProvider, StepItem } from '@src/core/components/step-flow'
import { STEPS_LOGIN } from '@src/modules/auth/constants/views'
import { LoginForm } from '@src/modules/auth/views/sign-in'
import dynamic from 'next/dynamic'

const TwoFactor = dynamic(async () => await import('@src/modules/auth/views/sign-in/two-factor'))

export default function LoginPage () {
  return (
    <StepFlowProvider defaultValue={STEPS_LOGIN.TWOFACTOR}>
      <StepItem value={STEPS_LOGIN.LOGIN}>
        <LoginForm />
      </StepItem>
      <StepItem value={STEPS_LOGIN.TWOFACTOR}>
        <TwoFactor />
      </StepItem>
      <StepItem value={STEPS_LOGIN.RESETPASSWORD}>
        <h1>
          RESETPASSWORD
        </h1>
      </StepItem>
      <StepItem value={STEPS_LOGIN.ADDGOOGLEAUTH}>
        <h1>
          ADDGOOGLEAUTH
        </h1>
      </StepItem>
    </StepFlowProvider>
  )
}

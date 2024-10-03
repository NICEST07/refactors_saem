import { StepFlowProvider, StepItem } from '@src/core/components/step-flow'
import { VIEWS } from '@src/modules/auth/constants/views'
import { LoginForm } from '@src/modules/auth/views/sign-in'

// const TwoFactor = dynamic(async () => await import('@src/modules/auth/views/sign-in/two-factor'))

export default function LoginPage () {
  return (
    <StepFlowProvider defaultValue={VIEWS.LOGIN}>
      <StepItem value={VIEWS.LOGIN}>
        <LoginForm />
      </StepItem>
      <StepItem value={VIEWS.TWOFACTOR}>
        <h1>A</h1>
      </StepItem>
      <StepItem value={VIEWS.RESETPASSWORD}>
        <h1>
          RESETPASSWORD
        </h1>
      </StepItem>
      <StepItem value={VIEWS.ADDGOOGLEAUTH}>
        <h1>
          ADDGOOGLEAUTH
        </h1>
      </StepItem>
    </StepFlowProvider>
  )
}

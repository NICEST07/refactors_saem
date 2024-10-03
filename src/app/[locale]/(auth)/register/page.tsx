
import { StepFlowProvider, StepItem } from '@src/core/components/step-flow'
import { VIEWS } from '@src/modules/auth/constants/views'
// import dynamic from 'next/dynamic'

// const VerificationUserForm = dynamic(async () => await import('@src/modules/auth/views/register/verification-user-form'), { ssr: false })
// const AuthQRCodeForm = dynamic(async () => await import('@src/modules/auth/views/config-2factor').then(m => m.AuthQRCodeForm), { ssr: false })

export default function RegisterPage () {
  return (
    <StepFlowProvider defaultValue={VIEWS.REGISTER}>
      <StepItem value={VIEWS.REGISTER}>
        <h1 />
      </StepItem>
      <StepItem value={VIEWS.VERIFY_NEW_USER}>
        <h1 />
      </StepItem>
      <StepItem value={VIEWS.ADDGOOGLEAUTH}>
        <h1 />
      </StepItem>
    </StepFlowProvider>
  )
}

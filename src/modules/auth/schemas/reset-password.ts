import { validatePassword } from '@src/core/utils/validate-password'
import { z } from 'zod'

export const resetPasswordSchema = z.object({
  password: z.string().min(8).refine(validatePassword),
  confirmPassword: z.string().min(8).refine(validatePassword)
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword']
})

export type ResetPassValues = z.infer<typeof resetPasswordSchema>

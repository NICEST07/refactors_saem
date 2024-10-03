import { z } from 'zod'

export const twoFactorSchema = z.object({
  code: z.string().min(6).max(7),
  method: z.string()
})

export type TwoFactorValues = z.infer<typeof twoFactorSchema>

import { z } from 'zod'

export const loginSchema = z.object({
  user: z.string().min(2).refine(value => value.trim() !== ''),
  password: z.string().min(2).refine(value => value.trim() !== '')
})

export type LoginValues = z.infer<typeof loginSchema>

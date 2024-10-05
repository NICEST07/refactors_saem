import { getMessageError } from '@src/core/utils/get-error-api'
import { signIn } from 'next-auth/react'

export async function createSession (token: string) {
  try {
    const res = await signIn('credentials', {
      redirect: false,
      accessToken: token
    })
    if (res == null || !res.ok || res.error != null) throw new Error(res?.error ?? await getMessageError())
    const url = new URL(res?.url ?? '')
    const searchParams = new URLSearchParams(url.search)
    return searchParams.get('callbackUrl') ?? '/dashboard'
  } catch (error) {
    return '/dashboard'
  }
}

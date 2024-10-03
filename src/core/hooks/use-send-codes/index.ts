import { useState } from 'react'
import { useCountdown } from '../use-count-down'
import { AxiosError } from 'axios'

export function useSendCode<TRes> ({ fetcher }: { fetcher: () => Promise<TRes> }) {
  const [loading, setLoading] = useState(false)
  const [count, { isStartCount, startCountdown }] = useCountdown({ initalCount: 30 })

  const handleReSendEmailCode = async () => {
    try {
      if (isStartCount) return
      setLoading(true)
      const result = await fetcher()
      if (result == null) return
      startCountdown()
    } catch (error) {
      if (error instanceof AxiosError) throw error.response?.data
    } finally {
      setLoading(false)
    }
  }

  return { handleReSendEmailCode, loading, count, isStartCount }
}

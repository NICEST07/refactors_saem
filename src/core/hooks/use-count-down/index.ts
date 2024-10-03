import { useEffect, useState } from 'react'

interface CountdownProps {
  initalCount: number
  intervalMs?: number
}

interface CountdownControllers {
  startCountdown: () => void
  stopCountdown: () => void
  resetCountdown: () => void
  isStartCount: boolean
}

export function useCountdown ({ initalCount = 30, intervalMs = 1000 }: CountdownProps): [number, CountdownControllers] {
  const [isStartCount, setIsStartCount] = useState(false)
  const [count, setCount] = useState(initalCount)

  useEffect(() => {
    const countdownCallback = () => {
      if (count === 0 && isStartCount) {
        stopCountdown()
        resetCountdown()
        return
      }
      setCount(count - 1)
    }
    if (!isStartCount) return
    const countdownInterval = setInterval(countdownCallback, intervalMs)
    return () => clearInterval(countdownInterval)
  }, [isStartCount, count])

  const stopCountdown = () => setIsStartCount(false)
  const startCountdown = () => setIsStartCount(true)
  const resetCountdown = () => setCount(initalCount)

  return [count, { isStartCount, startCountdown, resetCountdown, stopCountdown }]
}

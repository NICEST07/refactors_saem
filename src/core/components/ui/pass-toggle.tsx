'use client'

import { useState } from 'react'

interface PwdToggleProps {
  renderInput: (type: 'text' | 'password', setToggle?: () => void) => React.ReactNode
}

export function PasswordToggle ({ renderInput }: PwdToggleProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handlePassToggle = () => {
    setShowPassword(prevState => !prevState)
  }

  const type = showPassword ? 'text' : 'password'

  return (
    <>
      {renderInput(type, handlePassToggle)}
    </>
  )
}

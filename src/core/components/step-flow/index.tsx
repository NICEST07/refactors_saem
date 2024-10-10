'use client'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface StepsContextProps {
  step: string | number
  setStep: (value: string | number) => void
}

const StepsContext = createContext<StepsContextProps | null>(null)

export function StepFlowProvider ({ children, defaultValue = '' }: { children: React.ReactNode, defaultValue: StepsContextProps['step'] }) {
  const [step, setStep] = useState<string | number>(defaultValue)

  const handleStep = useCallback((value: StepsContextProps['step']) => {
    setStep(value)
  }, [])

  const value = useMemo(() => ({ step, setStep: handleStep }), [step, handleStep])

  return (
    <StepsContext.Provider value={value}>
      {children}
    </StepsContext.Provider>
  )
}

export function useStepFlow () {
  const context = useContext(StepsContext)
  if (context == null) throw new Error('Steps Provider is undefined')
  return context
}

export function StepItem ({ value, children }: { value: StepsContextProps['step'], children: React.ReactNode }): React.ReactNode {
  const { step } = useStepFlow()
  if (step !== value) return null

  return children
}

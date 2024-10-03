'use client'
import React, { createContext, useContext, useState } from 'react'

interface StepsContextProps {
  step: string | number
  setStep: React.Dispatch<React.SetStateAction<string | number>>
}

const StepsContext = createContext<StepsContextProps | null>(null)

export function StepFlowProvider ({ children, defaultValue = '' }: { children: React.ReactNode, defaultValue: StepsContextProps['step'] }) {
  const [step, setStep] = useState<string | number>(defaultValue)

  return (
    <StepsContext.Provider value={{ step, setStep }}>
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

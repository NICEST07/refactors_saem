'use client'

interface Props {
  shouldRender: boolean
  children: React.ReactNode
  fallbackRender?: () => React.ReactNode
}

export const ConditionalRender = ({ shouldRender, children, fallbackRender }: Props): React.ReactNode => {
  return shouldRender ? children : fallbackRender?.()
}

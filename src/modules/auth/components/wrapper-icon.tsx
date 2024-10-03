import { Label } from '@radix-ui/react-label'
import { cn } from '@src/core/lib/utils'

interface IconWrapperProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export function WrapperIcon ({ children, startIcon = null, endIcon = null, className }: IconWrapperProps) {
  return (
    <Label className={cn('w-full flex items-center justify-between bg-slate-100 border border-input px-3 overflow-hidden h-14 rounded-full', className)}>
      {startIcon}
      {children}
      {endIcon}
    </Label>
  )
}

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@src/core/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center rounded-xl justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-palette-primary text-primary-foreground hover:bg-palette-primary-700',
        secondary:
          'bg-palette-secondary text-secondary-foreground hover:bg-palette-secondary-600',
        ghost: 'hover:bg-palette-primary-100 hover:text-palette-primary-700',
        'ghost-secondary': 'hover:bg-palette-secondary-100 hover:text-palette-secondary-950',
        outline: 'border border-palette-primary bg-transparent text-palette-primary-800 hover:bg-palette-primary-100',
        'outline-secondary': 'border border-palette-secondary bg-transparent text-palette-secondary-800 hover:bg-palette-secondary-100',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        xl: 'h-12 px-10',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'

const buttonVariants = cva(
  'h-auto px-6 py-2 inline-flex items-center justify-center gap-[2px] whitespace-nowrap rounded-button text-xs md:text-sm font-medium transition-colors  disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary/90 px-2 text-xs md:text-sm',
        member: 'bg-primary text-white hover:bg-primary/90 px-3 md:px-6',
        category:
          'bg-primary text-white p-1 md:p-2 lg:py-1 lg:px-4 hover:bg-primary/90',
        categoryDelete:
          'bg-white border border-warning text-warning hover:text-white hover:bg-warning p-1 md:p-2 lg:py-1 lg:px-4',
        outline:
          'py-2 border border-primary bg-white text-primary hover:bg-primary hover:text-white',
        disabled: 'bg-modalBorder text-white hover:cursor-auto',
        inbox:
          'bg-primary text-white px-3 md:px-4 py-1 md:text-xs hover:bg-primary/90',
        custom: '',
      },
      size: {
        default: '',
        lg: '!p-2 md:!p-2 lg:!py-2 lg:!px-6', // 카테고리 생성 전용
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
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
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }

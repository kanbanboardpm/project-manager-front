import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'h-auto px-6 py-2 inline-flex items-center justify-center gap-[2px] whitespace-nowrap rounded-button text-xs md:text-sm font-medium transition-colors  disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // 기본버튼
        default:
          'bg-primary text-white hover:bg-primary/90 px-2 text-xs md:text-sm',
        member:
          'bg-primary text-white hover:bg-primary/90 px-3 md:px-6 flex gap-1', // 멤버
        // 카테고리
        category:
          'bg-primary text-white p-1 md:p-2 lg:py-1 lg:px-4 hover:bg-primary/90',
        // 카테고리 삭제
        categoryDelete:
          'bg-white border border-warning text-warning hover:text-white hover:bg-warning p-1 md:p-2 lg:py-1 lg:px-4',
        // 모달
        modal: '  bg-primary text-white hover:bg-primary/90',
        // 모달 아웃라인
        modalOutline:
          'py-2 border border-primary bg-white text-primary hover:bg-primary hover:text-white',
        date: 'py-2 border border-input hover:border-primary hover:text-primary focus:border-primary aria-expanded:border-primary',
        disabled: 'bg-modalBorder text-white hover:cursor-auto', // 모달 사용불가
        // 수신함
        inbox:
          'bg-primary text-white px-3 md:px-4 py-1 md:text-xs hover:bg-primary/90',
        custom: '',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
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

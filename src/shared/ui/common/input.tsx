import * as React from 'react'

import { cn } from '../../lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-auto w-full rounded-input border border-modalBorder bg-white px-3 py-2 text-sm  placeholder:text-modalPlaceholder focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }

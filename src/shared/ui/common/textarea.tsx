import * as React from 'react'

import { cn } from '../../lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'resize-none flex min-h-[160px] w-full rounded-input border border-modalBorder px-3 py-2 text-xs md:text-sm placeholder:text-modalPlaceholder focus:outline-none focus:border-primary disabled:cursor-not-allowed',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }

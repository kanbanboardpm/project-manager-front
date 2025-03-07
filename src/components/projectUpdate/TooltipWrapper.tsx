import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/common/tooltip'
import { ReactNode } from 'react'

export default function TooltipWrapper({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={className}>
          {children}
          <TooltipContent>권한이 없습니다</TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}

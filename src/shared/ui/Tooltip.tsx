import { ReactNode } from 'react'

export default function Tooltip({
  className,
  children,
  content,
}: {
  className?: string
  children: ReactNode
  content: ReactNode
}) {
  return (
    <div className={`${className} relative inline-block group`}>
      {children}

      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 border bg-white text-[#09090B] px-3 py-1.5 rounded-input shadow-md text-sm whitespace-nowrap z-10 transition-all duration-200 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
        {content}
      </div>
    </div>
  )
}

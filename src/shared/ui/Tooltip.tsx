import { ReactNode, useState } from 'react'

export default function Tooltip({
  className,
  children,
  content,
}: {
  className?: string
  children: ReactNode
  content: ReactNode
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      className={`${className} relative inline-block`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap z-10 opacity-0 translate-y-1 data-[state=open]:opacity-100 data-[state=open]:translate-y-0">
          {content}
          <span className="absolute top-full left-1/2 -ml-1 border-4 border-transparent border-t-black" />
        </div>
      )}
    </div>
  )
}

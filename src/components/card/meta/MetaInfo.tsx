export default function MetaInfoField({
  label,
  children,
  showDropdown = false,
}: {
  label: string
  children: React.ReactNode
  showDropdown?: boolean
}) {
  return (
    <div className="flex items-center gap-20">
      <span className="w-[8px] text-xs font-semibold text-cardDate whitespace-nowrap">
        {label}
      </span>
      <div className="flex items-center gap-3">
        {children}
        {showDropdown}
      </div>
    </div>
  )
}

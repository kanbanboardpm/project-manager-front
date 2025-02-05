// src/components/card/meta/CategorySelect.tsx
interface CategorySelectProps {
  value: string
  onChange: (value: string) => void
  isEdit?: boolean
}

export function CategorySelect({
  value,
  onChange,
  isEdit,
}: CategorySelectProps) {
  if (isEdit) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full bg-category-purple" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs text-cardDate border-none focus:ring-0"
        >
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="Design">Design</option>
        </select>
      </div>
    )
  }

  return (
    <>
      <div className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full bg-category-purple" />
      <span className="text-xs text-cardDate">{value}</span>
    </>
  )
}

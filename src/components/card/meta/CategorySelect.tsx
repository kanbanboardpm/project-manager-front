// src/components/card/meta/CategorySelect.tsx
interface CategorySelectProps {
  value: string
  color: string
  onChange: (value: string) => void
  isEdit?: boolean
}

const CATEGORY_OPTIONS = [
  { value: 'Backend', color: '#4E77E0' },
  { value: 'Frontend', color: '#F59E0B' },
  { value: 'Design', color: '#EC4899' },
]

export function CategorySelect({
  value,
  color,
  onChange,
  isEdit,
}: CategorySelectProps) {
  if (isEdit) {
    return (
      <div className="flex items-center gap-2">
        <div
          className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs text-cardDate border-none focus:ring-0"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="flex items-center gap-2"
            >
              <div
                className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full"
                style={{ backgroundColor: option.color }}
              />
              {option.value}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <>
      <div
        className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-cardDate">{value}</span>
    </>
  )
}

import { useQueryCategoryList } from '@/shared/queries/useQueryCategoryList'
import { Category } from '@/services/category.service'
import { useEffect } from 'react'

interface CategorySelectProps {
  value: string
  color: string
  onChange: (categoryId: string) => void
  isEdit?: boolean
  projectId: number
}

export function CategorySelect({
  value,
  color,
  onChange,
  isEdit,
  projectId,
}: CategorySelectProps) {
  const { data } = useQueryCategoryList(projectId)
  useEffect(() => {
    const categories = data?.data ?? []
    if (categories.length > 0 && value) {
      const currentCategory = categories.find((cat) => cat.name === value)
      if (currentCategory) {
        onChange(currentCategory.id)
      }
    }
  }, [data?.data, value, onChange])

  if (isEdit) {
    const categories = data?.data ?? []
    return (
      <div className="flex items-center gap-2">
        <div
          className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <select
          value={value}
          onChange={(e) => {
            const selectedCategory = categories.find(
              (cat) => cat.name === e.target.value,
            )
            if (selectedCategory) {
              onChange(selectedCategory.id)
            }
          }}
          className="text-xs text-cardDate border-none focus:ring-0"
        >
          {categories.map((category: Category) => (
            <option key={category.id} value={category.name}>
              {category.name}
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

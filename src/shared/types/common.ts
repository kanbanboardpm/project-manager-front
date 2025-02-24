import { CATEGORY_COLORS } from '@/shared/constants/color'

type CategoryColors = typeof CATEGORY_COLORS
type ColorKeys = keyof CategoryColors
export type UppercaseColorKeys = Uppercase<ColorKeys>

export interface ProjectSectionParams {
  projectId: number
  sectionId: number
}

export interface TempMember {
  id?: number
  email: string
  imageUrl?: string
  profileColor?: string
}

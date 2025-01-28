/**
 * 공통 아이콘 컴포넌트
 *
 * @example
 * <Icon
 *   icon="Home"                      // 필수: 아이콘 이름
 *   size={24}                        // 선택: 크기 (기본값: 24)
 *   color="blue"                     // 선택: 색상
 *   className="hover:opacity-80"     // 선택: Tailwind 클래스
 * />
 */

import AngleDoubleDown from '@/assets/icons/angle-double-small-down.svg?react'
import AngleDoubleLeft from '@/assets/icons/angle-double-small-left.svg?react'
import AngleDoubleRight from '@/assets/icons/angle-double-small-right.svg?react'
import AngleDoubleUp from '@/assets/icons/angle-double-small-up.svg?react'
import AngleLeft from '@/assets/icons/angle-small-left.svg?react'
import AngleRight from '@/assets/icons/angle-small-right.svg?react'
import Bell from '@/assets/icons/bell.svg?react'
import Category from '@/assets/icons/category.svg?react'
import Check from '@/assets/icons/check.svg?react'
import Close from '@/assets/icons/cross.svg?react'
import EyeClosed from '@/assets/icons/eye-crossed.svg?react'
import Eye from '@/assets/icons/eye.svg?react'
import Folder from '@/assets/icons/folder.svg?react'
import Home from '@/assets/icons/home.svg?react'
import Kakao from '@/assets/icons/icon-kaKao.svg?react'
import Menu from '@/assets/icons/menu-burger.svg?react'
import Update from '@/assets/icons/pencil.svg?react'
import Plus from '@/assets/icons/plus.svg?react'
import Setting from '@/assets/icons/settings.svg?react'
import Delete from '@/assets/icons/trash.svg?react'
import Member from '@/assets/icons/users.svg?react'

import { FC, SVGProps } from 'react'

export type IconName =
  | 'AngleDoubleDown'
  | 'AngleDoubleLeft'
  | 'AngleDoubleRight'
  | 'AngleDoubleUp'
  | 'AngleLeft'
  | 'AngleRight'
  | 'Bell'
  | 'Category'
  | 'Check'
  | 'Close'
  | 'EyeClosed'
  | 'Eye'
  | 'Folder'
  | 'Home'
  | 'Kakao'
  | 'Menu'
  | 'Update'
  | 'Plus'
  | 'Setting'
  | 'Delete'
  | 'Member'

const ICONS: Record<IconName, FC<SVGProps<SVGSVGElement>>> = {
  AngleDoubleDown,
  AngleDoubleLeft,
  AngleDoubleRight,
  AngleDoubleUp,
  AngleLeft,
  AngleRight,
  Bell,
  Category,
  Check,
  Close,
  EyeClosed,
  Eye,
  Folder,
  Home,
  Kakao,
  Menu,
  Update,
  Plus,
  Setting,
  Delete,
  Member,
}
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconName
  size?: number
  color?: string
  className?: string
}

export const Icon = ({ icon, size = 24, color, className }: IconProps) => {
  const SelectedIcon = ICONS[icon]
  return (
    <SelectedIcon
      width={size}
      height={size}
      color={color}
      fill={color}
      stroke={color}
      className={className}
    />
  )
}

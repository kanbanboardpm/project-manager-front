import profileImg from '@/assets/images/profile.png'
import { differenceInDays, endOfDay, format } from 'date-fns'

interface CardProps {
  category: string
  color: string
  title: string
  startDate: Date
  endDate: Date
  userImg: string
}

export default function Card({
  category,
  color,
  title,
  startDate,
  endDate,
  userImg,
}: CardProps) {
  const now = endOfDay(new Date())
  const endDay = endOfDay(endDate)
  const dDay = differenceInDays(endDay, now)

  return (
    <div className="w-full rounded-card bg-white shadow-md mb-2">
      <div
        className="px-3 py-1 text-xs rounded-t-card"
        style={{ backgroundColor: `${color}` }}
      >
        {category}
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col flex-1 gap-1 pl-3 py-2 truncate">
          <span className="text-sm truncate">{title}</span>
          <span className="text-xs text-cardDate">
            {format(startDate, 'yy.MM.dd.')}~{format(endDate, 'yy.MM.dd.')}
          </span>
        </div>
        <div className="flex flex-col items-center mt-2 mb-1.5 mr-1.5 gap-0.5">
          <span className="text-xs w-fit">
            D{dDay < 0 ? `+${dDay * -1}` : dDay === 0 ? '-day' : dDay * -1}
          </span>
          <img
            src={userImg || profileImg}
            width={25}
            height={25}
            alt="user-img"
          />
        </div>
      </div>
    </div>
  )
}

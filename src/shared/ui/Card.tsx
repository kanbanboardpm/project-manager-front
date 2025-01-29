import profileImg from '@/assets/images/profile.png'

// interface CardProps {
//   category: string
//   title: string
//   startDate: Date
//   endDate: Date
//   userImg: string
// }

export default function Card() {
  return (
    <div className="w-full rounded-card bg-white shadow-md">
      <div
        className="px-3 py-0.5 text-xs rounded-t-card"
        style={{ backgroundColor: '#F4B400' }}
      >
        Category
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col flex-1 gap-1 pl-3 py-2 truncate">
          <span className="text-sm truncate">
            카테고리 생성/수정 생성/수정 생성/수정 기능 구현
          </span>
          <span className="text-xs text-cardDate">25.01.29 ~ 25.01.31</span>
        </div>
        <div className="flex flex-col items-center mt-2 mb-1.5 mr-1.5 gap-0.5">
          <span className="text-xs w-fit">D-5</span>
          <img src={profileImg} width={25} height={25} alt="user-img" />
        </div>
      </div>
    </div>
  )
}

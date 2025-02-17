import { useQuerySectionCardList } from '@/shared/queries/useQuerySectionCardList'
import { format } from 'date-fns'

export default function CompletedCardList({
  projectId,
}: {
  projectId: number
}) {
  const sectionId = parseInt(location.pathname.split('/').slice(-1).join(''))

  const { data: sectionCardList } = useQuerySectionCardList(
    projectId,
    sectionId,
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-sm md:text-base pt-2">완료</div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="text-xs font-normal flex bg-white rounded-sm py-1 items-center text-center">
            <div className="hidden lg:block lg:w-[104px]">카테고리</div>
            <div className="w-[180px] md:w-[233px] lg:w-[230px]">제목</div>
            <div className="hidden lg:block lg:w-[170px]">기간</div>
            <div className="w-[103px] md:w-[130px] lg:w-[130px]">완료 날짜</div>
            <div className="hidden md:block md:w-[90px] lg:w-[70px]">
              담당자
            </div>
          </div>
        </div>
        {sectionCardList?.data
          ?.filter((card) => card.completedDate !== null)
          .map((card) => {
            return (
              <div key={card.title}>
                <div className="text-xs flex bg-white rounded-sm py-1.5 items-center text-center">
                  <div className="hidden lg:block lg:w-[104px]">
                    {card.categoryName}
                  </div>
                  <div className="w-[180px] md:w-[233px] lg:w-[230px] text-sm">
                    {card.title}
                  </div>
                  <div className="hidden lg:block lg:w-[170px] text-cardDate font-normal">
                    {format(card.startDate, 'yy.MM.dd.')} ~&nbsp;
                    {format(card.endDate, 'yy.MM.dd.')}
                  </div>
                  <div className="w-[103px] md:w-[130px] lg:w-[130px] lg:text-sm font-semibold">
                    {card.completedDate}
                  </div>
                  <div className="hidden md:block md:w-[90px] lg:w-[70px] font-normal">
                    {card.nickName}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

import { useQueryCardList } from '@/shared/queries/useQueryCardList'
import Card from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
import { useState } from 'react'

export default function InProgressCardList({
  projectId,
}: {
  projectId: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  const { openModal } = useModalStore()

  const { data: cardList } = useQueryCardList(projectId)

  return (
    <div className="lg:w-[256px] flex flex-col gap-2">
      <div className="font-semibold text-sm md:text-base flex justify-between items-center pt-2 ">
        진행 중
        <Icon
          className="md:hidden cursor-pointer"
          icon={isOpen ? 'AngleDoubleUp' : 'AngleDoubleDown'}
          size={20}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className={`md:grid md:grid-cols-2 lg:flex flex flex-col md:gap-x-2 transition-all duration-300 ease-in-out overflow-hidden md:!max-h-none ${
          isOpen ? 'max-h-[1000px] slide-down' : 'max-h-[89px] slide-up'
        }`}
      >
        {cardList?.data?.map((card) => {
          return <Card key={card.cardId} projectId={projectId} {...card} />
        })}
        <div
          className="w-full h-[81px] bg-white flex justify-center items-center cursor-pointer rounded-card"
          onClick={() => openModal('create-card')}
        >
          <Icon icon="Plus" size={14} />
        </div>
      </div>
    </div>
  )
}

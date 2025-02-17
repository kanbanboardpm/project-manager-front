import CompletedCardList from './CompletedCardList'
import InProgressCardList from './InProgressCardList'

export default function CardListContainer({
  projectId,
}: {
  projectId: number
}) {
  return (
    <section className="bg-bodyBg h-full px-3 lg:px-0 w-full ">
      <div className="w-[283px] md:w-[453px] lg:w-[996px] mx-auto lg:flex-row lg:px-3 flex flex-col gap-3">
        <InProgressCardList projectId={projectId} />
        <CompletedCardList projectId={projectId} />
      </div>
    </section>
  )
}

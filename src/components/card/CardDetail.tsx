import { useNavigate, useParams } from 'react-router-dom'
import ProjectHeader from '../projectMain/ProjectHeader'
import { Button } from '@/shared/ui/common/button'
import MetaInfoField from './meta/MetaInfo'
import { Textarea } from '@/shared/ui/common/textarea'
// import CommentSection from './CommentSection'
import { Input } from '@/shared/ui/common/input'
import { ActionButtons } from './ActionButtons'
import { CategorySelect } from './meta/CategorySelect'
import { AssigneeField } from './meta/AssigneeField'
import { DateField } from './meta/DateField'
import { ProjectField } from './meta/ProjectField'
import { useQueryCardDetail } from '@/shared/queries/useQueryCardDetail'
import { useMutationUpdateCard } from '@/shared/queries/useMutationUpdateCard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'
import { useProjectId } from '@/shared/hooks/useProjectId'

interface CardDetailProps {
  mode?: 'view' | 'edit'
}

const formSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '설명을 입력해주세요'),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  categoryId: z.string(),
})

type FormValues = z.infer<typeof formSchema>

export default function CardDetail({ mode = 'view' }: CardDetailProps) {
  const navigate = useNavigate()
  const projectId = useProjectId()
  const { sectionId, cardId } = useParams<{
    sectionId: string
    cardId: string
  }>()
  const parsedSectionId = Number(sectionId)
  const parsedCardId = Number(cardId)

  const isEdit = mode === 'edit'
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  const {
    data: cardDetail,
    isPending,
    isError,
  } = useQueryCardDetail({
    cardId: parsedCardId,
    projectId,
    sectionId: parsedSectionId,
  })
  const updateCardMutation = useMutationUpdateCard()
  const card = cardDetail?.data
  const isComplete = card?.completeDate !== null
  useEffect(() => {
    if (card) {
      reset({
        title: card.title,
        content: card.content,
        startDate: new Date(card?.startDate),
        endDate: new Date(card?.endDate),
        categoryId: '',
      })
    }
  }, [card, reset])

  const onSubmit = async (values: FormValues) => {
    if (!cardId || !projectId || !sectionId) return
    try {
      await updateCardMutation.mutateAsync({
        cardId: parsedCardId,
        data: values,
      })
      navigate(`/project/${projectId}/section/${sectionId}/${cardId}`)
    } catch (error) {
      console.error('Error updating card:', error)
    }
  }

  if (isPending)
    return <div className="min-h-screen bg-screenBg p-6">로딩중...</div>
  if (isError || !card)
    return (
      <div className="min-h-screen bg-screenBg p-6">
        카드를 불러올 수 없습니다.
      </div>
    )

  return (
    <div className="min-h-screen bg-white w-full rounded-card">
      <ProjectHeader projectId={projectId} />
      <main>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-card p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6"
        >
          {!isEdit && (
            <ActionButtons isComplete={isComplete} cardId={parsedCardId} />
          )}

          {/* Title */}
          {isEdit ? (
            <div>
              <Input
                {...register('title')}
                type="text"
                className="text-lg sm:text-xl md:text-2xl font-semibold"
              />
              {errors.title && (
                <p className="text-error text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
          ) : (
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
              {card?.title}
            </h2>
          )}

          {/* Meta Information */}
          <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-[280px] md:w-[390px]">
            <AssigneeField name={card.nickName} photoUrl={card?.photoUrl} />
            {isEdit ? (
              <DateField
                isEdit={true}
                startDate={
                  card.startDate ? new Date(card.startDate) : undefined
                }
                endDate={card.endDate ? new Date(card.endDate) : undefined}
                onRangeSelect={(range) => {
                  setValue('startDate', range?.from)
                  setValue('endDate', range?.to)
                }}
                displayEndDate={card.endDate}
              />
            ) : (
              <DateField
                isEdit={false}
                startDate={new Date(card.startDate)}
                endDate={new Date(card.endDate)}
                displayEndDate={card.endDate}
              />
            )}
            <ProjectField
              projectName={card.nickName}
              projectCategory={card.categoryName}
            />
            <MetaInfoField label="카테고리" showDropdown={isEdit}>
              <CategorySelect
                value={card.categoryName}
                color={card.categoryColor}
                onChange={(categoryId) => setValue('categoryId', categoryId)}
                isEdit={isEdit}
                projectId={projectId}
              />
              {errors.categoryId && (
                <p className="text-error text-xs mt-1">
                  {errors.categoryId.message}
                </p>
              )}
            </MetaInfoField>
          </div>

          {/* Description */}
          <div className="w-full space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold text-cardDate">
              설명
            </h3>
            {isEdit ? (
              <div>
                <Textarea
                  {...register('content')}
                  className="w-full p-2 sm:p-3 border border-bodyBorder rounded-input text-xs sm:text-sm"
                />
                {errors.content && (
                  <p className="text-error text-xs mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="w-full p-3 sm:p-4 bg-bodyBg rounded-card">
                <p className="text-xs sm:text-sm whitespace-pre-line">
                  {card?.content}
                </p>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="w-full">
            {isEdit ? (
              <div className="flex justify-end gap-2">
                <Button
                  variant="modalOutline"
                  type="button"
                  onClick={() =>
                    navigate(
                      `/project/${projectId}/section/${sectionId}/${cardId}`,
                    )
                  }
                  disabled={updateCardMutation.isPending}
                  className="h-7 sm:h-8 text-xs sm:text-sm"
                >
                  취소하기
                </Button>
                <Button
                  variant="modal"
                  type="submit"
                  disabled={!isValid || updateCardMutation.isPending}
                  className="h-7 sm:h-8 text-xs sm:text-sm"
                >
                  {updateCardMutation.isPending ? '수정 중...' : '수정하기'}
                </Button>
              </div>
            ) : (
              // <CommentSection comments={cardDetail?.comments} completeDate={isComplete} />
              <div>댓글</div>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}

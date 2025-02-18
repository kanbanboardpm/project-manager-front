import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/shared/ui/common/button'
import { Input } from '@/shared/ui/common/input'
import { Textarea } from '@/shared/ui/common/textarea'
import { ActionButtons } from './ActionButtons'
import { CategorySelect } from './meta/CategorySelect'
import { AssigneeField } from './meta/AssigneeField'
import { DateField } from './meta/DateField'
import MetaInfoField from './meta/MetaInfo'
import { useQueryCardDetail } from '@/shared/queries/useQueryCardDetail'
import { useMutationUpdateCard } from '@/shared/queries/useMutationEditCard'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback, useEffect } from 'react'
import { format } from 'date-fns'
import { SectionField } from './meta/SectionField'

interface CardContentProps {
  mode: 'view' | 'edit'
  projectId: number
}

const formSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요'),
    content: z.string().min(1, '설명을 입력해주세요'),
    startDate: z.date({ required_error: '시작 날짜를 선택하세요' }),
    endDate: z.date({ required_error: '종료 날짜를 선택하세요' }),
    categoryId: z.number(),
    categoryName: z.string().optional(),
    categoryColor: z.string().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '종료 날짜는 시작 날짜보다 빠를 수 없습니다.',
    path: ['endDate'],
  })

type FormValues = z.infer<typeof formSchema>

export default function CardContent({ projectId, mode }: CardContentProps) {
  const navigate = useNavigate()
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
    watch,
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
        startDate: card.startDate
          ? new Date(card.startDate.split('T')[0])
          : undefined,
        endDate: card.endDate
          ? new Date(card.endDate.split('T')[0])
          : undefined,
        categoryId: undefined,
        categoryName: card.categoryName,
        categoryColor: card.categoryColor,
      })
    }
  }, [card, reset])

  const handleCategoryChange = useCallback(
    (categoryId: number, categoryName: string, categoryColor: string) => {
      setValue('categoryId', categoryId)
      setValue('categoryName', categoryName)
      setValue('categoryColor', categoryColor)
    },
    [setValue],
  )

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
    <main>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-card p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6"
      >
        <ActionButtons
          isComplete={isComplete}
          cardId={parsedCardId}
          isEdit={isEdit}
        />
        {isEdit ? (
          <div>
            <Input
              {...register('title')}
              type="text"
              className="text-lg sm:text-xl md:text-2xl font-semibold"
            />
            {errors.title && (
              <p className="text-error text-xs mt-1">{errors.title.message}</p>
            )}
          </div>
        ) : (
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            {card?.title}
          </h2>
        )}

        <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-[280px] md:w-[390px]">
          <AssigneeField name={card.nickName} photoUrl={card?.photoUrl} />
          {isEdit ? (
            <DateField
              isEdit={true}
              startDate={watch('startDate')}
              endDate={watch('endDate')}
              displayEndDate={
                watch('endDate') ? format(watch('endDate'), 'M월 d일') : ''
              }
              onRangeSelect={(range) => {
                setValue('startDate', range?.from ?? new Date(), {
                  shouldValidate: true,
                })
                setValue('endDate', range?.to ?? new Date(), {
                  shouldValidate: true,
                })
              }}
            />
          ) : (
            <DateField isEdit={false} displayEndDate={card.endDate} />
          )}
          <SectionField projectId={projectId} sectionId={parsedSectionId} />
          <MetaInfoField label="카테고리" showDropdown={isEdit}>
            <CategorySelect
              value={watch('categoryName') || card.categoryName}
              color={watch('categoryColor') || card.categoryColor}
              onChange={handleCategoryChange}
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
            <div>댓글</div>
          )}
        </div>
      </form>
    </main>
  )
}

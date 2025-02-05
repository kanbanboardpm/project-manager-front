import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ADDITIONAL_DATA,
  CardData,
  MOCK_CARD_DETAIL,
} from '@/shared/mock/cardDetail.ts'
import ProjectHeader from '../projectMain/ProjectHeader'
import { Button } from '@/shared/ui/common/button'
import MetaInfoField from './meta/MetaInfo'
import { Textarea } from '@/shared/ui/common/textarea'
import CommentSection from './CommentSection'
import { useEffect, useState } from 'react'
import { FormData, updateCard } from '@/services/card.service'
import { Input } from '@/shared/ui/common/input'
import { ActionButtons } from './ActionButtons'
import { CategorySelect } from './meta/CategorySelect'
import { AssigneeField } from './meta/AssigneeField'
import { DateField } from './meta/DateField'
import { ProjectField } from './meta/ProjectField'

interface CardDetailProps {
  mode?: 'view' | 'edit' | 'complete'
}

export default function CardDetail({ mode = 'view' }: CardDetailProps) {
  const navigate = useNavigate()
  const { cardId } = useParams()
  const isComplete = mode === 'complete'
  const isEdit = mode === 'edit'

  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    startDate: undefined,
    endDate: undefined,
  })

  const { data, isLoading } = useQuery<CardData>({
    queryKey: ['card', cardId],
    queryFn: async () => MOCK_CARD_DETAIL,
  })

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.data.title,
        description: data.data.content,
        category: data.data.category,
        startDate: new Date(data.data.startDate),
        endDate: new Date(data.data.endDate),
      })
    }
  }, [data])

  const mutation = useMutation({
    mutationFn: updateCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['card', cardId] })
      navigate(`/projects/${cardId}`)
    },
  })

  if (isLoading)
    return <div className="min-h-screen bg-screenBg p-6">로딩중...</div>
  if (!data)
    return (
      <div className="min-h-screen bg-screenBg p-6">
        카드를 불러올 수 없습니다.
      </div>
    )

  return (
    <div className="min-h-screen bg-white w-full rounded-card">
      <ProjectHeader />
      <main>
        <div className="bg-white rounded-card p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
          {!isEdit && <ActionButtons isComplete={isComplete} />}

          {/* Title */}
          {isEdit ? (
            <Input
              type="text"
              value={formData.title}
              className="text-lg sm:text-xl md:text-2xl font-semibold"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
              {data.data.title}
            </h2>
          )}

          {/* Meta Information */}
          <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-[280px] md:w-[390px]">
            {/* 담당자 (고정)*/}
            <AssigneeField name="김나연" />
            {/* 마감일 */}
            {isEdit ? (
              <DateField
                isEdit={true}
                startDate={formData.startDate}
                endDate={formData.endDate}
                onRangeSelect={(range) => {
                  setFormData((prev) => ({
                    ...prev,
                    startDate: range?.from,
                    endDate: range?.to,
                  }))
                }}
                displayStartDate={data.data.startDate}
                displayEndDate={data.data.endDate}
              />
            ) : (
              <DateField
                isEdit={false}
                startDate={formData.startDate}
                endDate={formData.endDate}
                displayStartDate={data.data.startDate}
                displayEndDate={data.data.endDate}
              />
            )}
            {/* 프로젝트(고정) */}
            <ProjectField
              projectName={ADDITIONAL_DATA.project.name}
              projectCategory={ADDITIONAL_DATA.project.category}
            />
            {/* 카테고리 */}
            <MetaInfoField label="카테고리" showDropdown={isEdit}>
              <CategorySelect
                value={formData.category}
                onChange={(category) =>
                  setFormData((prev) => ({ ...prev, category }))
                }
                isEdit={isEdit}
              />
            </MetaInfoField>
          </div>

          {/* Description */}
          <div className=" w-full space-y-2 sm:space-y-3 ">
            <h3 className="text-xs sm:text-sm font-semibold text-cardDate">
              설명
            </h3>
            {isEdit ? (
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full p-2 sm:p-3 border border-bodyBorder rounded-input text-xs sm:text-sm"
              />
            ) : (
              <div className="w-full p-3 sm:p-4 bg-bodyBg rounded-card">
                <p className=" text-xs sm:text-sm whitespace-pre-line">
                  {data.data.content}
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
                  onClick={() => navigate(`/projects/${cardId}`)}
                  disabled={mutation.isPending}
                  className="h-7 sm:h-8 text-xs sm:text-sm"
                >
                  취소하기
                </Button>
                <Button
                  variant="modal"
                  onClick={() =>
                    cardId && mutation.mutate({ cardId, data: formData })
                  }
                  disabled={mutation.isPending}
                  className="h-7 sm:h-8 text-xs sm:text-sm"
                >
                  {mutation.isPending ? '수정 중...' : '수정하기'}
                </Button>
              </div>
            ) : (
              <CommentSection comments={data.comments} mode={mode} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

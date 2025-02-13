import axiosApi from '@/helper/api_helper'
import { APIResponse } from '@/shared/types/response'

export interface FormData {
  title: string
  content: string
  startDate?: Date
  endDate?: Date
  categoryId: string
}
export interface CreateCardRequest {
  projectId: string | undefined
  sectionId: string | undefined
  categoryId: string | undefined
  title: string
  content: string | undefined
  startDate: Date | undefined
  endDate: Date | undefined
}

export interface UpdateCardRequest {
  cardId: number
  data: FormData
}

export interface CardData {
  id: number
  title: string
  content: string
  startDate: string
  endDate: string
  completeDate: string | null
  categoryColor: string
  categoryName: string
  nickName: string
  photoUrl: string
}

export interface DeleteCardRequest {
  cardId: number
  projectId: number
}

export interface CompleteCardRequest {
  cardId: number
  completeDate: string | null
}

export const createCard = async (payload: CreateCardRequest) => {
  const response = await axiosApi.post(`/cards`, payload)
  return response.data
}

export const updateCard = async ({
  cardId,
  data,
}: UpdateCardRequest): Promise<APIResponse<null>> => {
  const response = await axiosApi.put(`/cards/${cardId}`, data)
  return response.data
}

export const deleteCard = async ({
  cardId,
  projectId,
}: DeleteCardRequest): Promise<APIResponse<null>> => {
  const response = await axiosApi.delete(`/cards/${cardId}`, {
    data: {
      projectId,
    },
  })
  return response.data
}

export const completeCard = async ({
  cardId,
  completeDate,
}: CompleteCardRequest): Promise<APIResponse<null>> => {
  const response = await axiosApi.post(`/cards/${cardId}`, {
    data: {
      completeDate,
    },
  })
  return response.data
}

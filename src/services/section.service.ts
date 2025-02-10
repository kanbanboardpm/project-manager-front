import axiosApi from '@/helper/api_helper'

export interface CreateSectionRequest {
  projectId: string | undefined
  name: string
}

export interface Section {
  id: number
  name: string
}

export interface UpdateSectionRequest {
  id: number
  name: string
}

export const createSection = async ({
  projectId,
  name,
}: CreateSectionRequest) => {
  const response = await axiosApi.post(`projects/${projectId}/sections`, {
    name,
  })
  if (!response?.data) {
    throw new Error('Failed to create section')
  }
  return response.data
}

export const updateSection = async ({ id, name }: UpdateSectionRequest) => {
  const response = await axiosApi.put(`sections/${id}`, {
    name,
  })
  return response.data
}

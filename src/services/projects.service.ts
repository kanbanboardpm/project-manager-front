import axiosApi from '@/helper/api_helper'
import { CATEGORY_COLORS } from '@/shared/constants/color'
import axios from 'axios'

type CategoryColors = typeof CATEGORY_COLORS
type ColorKeys = keyof CategoryColors
type UppercaseColorKeys = Uppercase<ColorKeys>

export interface CreateProjectRequest {
  name: string
  color: UppercaseColorKeys
}

export interface UpdateProjectRequest {
  id: string | undefined
  name: string
  // color: string
}

export interface GetProjectRequest {
  projectId: number
}

export interface Project {
  id: number
  name: string
  color: string
}

export const createProject = async (
  payload: CreateProjectRequest,
): Promise<Project> => {
  try {
    const { data } = await axiosApi.post(`/projects`, payload)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error)
    }
    throw error
  }
}

export const updateProject = async ({
  id,
  // color,
  name,
}: UpdateProjectRequest) => {
  const response = await axiosApi.put(`/projects/${id}`, { name })
  return response.data
}

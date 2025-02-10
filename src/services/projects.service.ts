import axiosApi from '@/helper/api_helper'
import { CATEGORY_COLORS } from '@/shared/constants/color'
import { APIResponse } from '@/shared/types/response'
import axios from 'axios'

type CategoryColors = typeof CATEGORY_COLORS
type ColorKeys = keyof CategoryColors
type UppercaseColorKeys = Uppercase<ColorKeys>

export interface CreateProjectRequest {
  name: string
  color: UppercaseColorKeys
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
    const { data } = await axiosApi.post(`/api/projects`, payload)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error)
    }
    throw error
  }
}

export const getProject = async (
  payload: GetProjectRequest,
): Promise<APIResponse> => {
  try {
    const response = await axiosApi.get(`/api/projects`, payload)
    return response
  } catch (error) {
    console.error(error)
  }
}

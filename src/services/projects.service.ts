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

export const getProjects = async () => {
  try {
    const { data } = await axiosApi.get('/api/projects')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error)
    }
    throw error
  }
}

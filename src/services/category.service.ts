import axiosApi from '@/helper/api_helper'
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/shared/types/category'

export const getAllCategories = async (projectNumber: number) => {
  try {
    const response = await axiosApi.get('/categories', {
      params: {
        projectId: projectNumber,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createCategory = async ({
  projectId,
  name,
  description,
  color,
}: CreateCategoryRequest) => {
  const response = await axiosApi.post(`projects/${projectId}/categories`, {
    name,
    description,
    color,
  })
  return response.data
}

export const updateCategory = async ({
  categoryId,
  name,
  description,
  color,
}: UpdateCategoryRequest) => {
  const response = await axiosApi.put(`/categories/${categoryId}`, {
    name,
    description,
    color,
  })
  return response.data
}

export const deleteCategory = async ({
  categoryId,
}: {
  categoryId: number
}) => {
  const response = await axiosApi.delete(`/categories/${categoryId}`)
  return response.data
}

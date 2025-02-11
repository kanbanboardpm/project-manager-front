import axiosApi from '@/helper/api_helper'

export interface User {
  email: string
  nickname: string
  imageUrl: string
}

export interface Project {
  id: string
  name: string
  color: string
}

export interface ProjectsResponse {
  data: Project[]
}

export const getUser = async (): Promise<User> => {
  const response = await axiosApi.get('/users')
  return response.data.data
}

export const getProjects = async (): Promise<ProjectsResponse> => {
  const response = await axiosApi.get('/projects')
  return response.data
}

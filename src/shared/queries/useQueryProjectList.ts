import axiosApi from '@/helper/api_helper'
import { Project } from '@/services/projects.service'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { QUERY_KEYS } from '../constants/queryKeys'

const useQueryProjectList = () => {
  const { isPending, isError, data, error } = useQuery<
    AxiosResponse<Project[]>
  >({
    queryKey: QUERY_KEYS.projects.lists(''),
    queryFn: async () => {
      try {
        const { data } = await axiosApi.get('/projects')
        return data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error)
        }
        throw error
      }
    },
  })
  return { isPending, isError, data, error }
}

export { useQueryProjectList }

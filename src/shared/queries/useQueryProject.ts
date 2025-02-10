import axiosApi from '@/helper/api_helper'
import { Project } from '@/services/projects.service'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { QUERY_KEYS } from './useMutationCreateProjects'

const useQueryProject = (projectId: string | undefined) => {
  console.log(projectId)
  const { isPending, isError, data, error } = useQuery<AxiosResponse<Project>>({
    queryKey: QUERY_KEYS.projects.lists(projectId ?? ''),
    queryFn: async () => {
      try {
        const { data } = await axiosApi.get(`/api/projects/${projectId}`)
        console.log('data', data)

        return data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error)
        }
        throw error
      }
    },
    enabled: !!projectId,
  })
  return { isPending, isError, data, error }
}

export { useQueryProject }

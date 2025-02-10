import axiosApi from '@/helper/api_helper'
import { Section } from '@/services/section.service'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

const useQuerySectionList = (projectId: string | undefined) => {
  const { data, isError } = useQuery<APIResponse<Section[]>>({
    queryKey: QUERY_KEYS.sections.lists(),
    queryFn: async () => {
      try {
        const { data } = await axiosApi.get(`/projects/${projectId}/sections`)
        return data
      } catch (error) {
        console.error(error)
      }
    },
  })
  return { data, isError }
}

export { useQuerySectionList }

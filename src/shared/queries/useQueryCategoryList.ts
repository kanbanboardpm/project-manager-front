import axiosApi from '@/helper/api_helper'
import { Category } from '@/services/category.service'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

const useQueryCategoryList = (projectId: string | undefined) => {
  const { data, isError } = useQuery<APIResponse<Category[]>>({
    queryKey: QUERY_KEYS.categories.lists(),
    queryFn: async () => {
      try {
        const { data } = await axiosApi.get('/categories', {
          params: { project_id: projectId },
        })
        return data
      } catch (error) {
        console.error(error)
      }
    },
  })

  return { data, isError }
}

export { useQueryCategoryList }

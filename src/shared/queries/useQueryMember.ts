import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'

const useQueryMember = (projectId: number) => {
  const { data, isError } = useQuery({
    queryKey: QUERY_KEYS.members.all,
    queryFn: async () => {
      const { data } = await axiosApi.get(`projects/${projectId}/users`)
      return data.data
    },
  })
  return { data, isError }
}

export { useQueryMember }

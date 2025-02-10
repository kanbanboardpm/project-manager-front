import axiosApi from '@/helper/api_helper'
import { Section } from '@/services/section.service'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'

interface GetSectionProps {
  projectId: number
  sectionId: number
}

const useQuerySection = ({ projectId, sectionId }: GetSectionProps) => {
  const { data, isError } = useQuery<Section>({
    queryKey: QUERY_KEYS.sections.all,
    queryFn: async () => {
      const { data } = await axiosApi.get(
        `/projects/${projectId}/sections/${sectionId}`,
      )
      return data.data
    },
  })
  return { data, isError }
}

export { useQuerySection }

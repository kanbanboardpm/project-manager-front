import {
  createSection,
  CreateSectionRequest,
  Section,
} from '@/services/section.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'

const useMutationCreateSection = () => {
  const queryClient = useQueryClient()

  return useMutation<Section, Error, CreateSectionRequest>({
    mutationFn: createSection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sections.all,
      })
    },
  })
}

export { useMutationCreateSection }

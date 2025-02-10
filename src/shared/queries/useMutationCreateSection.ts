import {
  createSection,
  CreateSectionRequest,
  Section,
} from '@/services/section.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'

const useMutationCreateSection = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<Section, Error, CreateSectionRequest>({
    mutationFn: createSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sections.lists() })
    },
  })

  return mutation
}

export { useMutationCreateSection }

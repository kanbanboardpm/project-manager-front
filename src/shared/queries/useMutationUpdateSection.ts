import { Section, UpdateSectionRequest } from '@/services/section.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useMutationUpdateSection = () => {
  const queryClient = useQueryClient()

  return useMutation<Section, Error, UpdateSectionRequest>({})
}

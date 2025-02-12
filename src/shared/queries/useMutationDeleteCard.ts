import { deleteCard } from '@/services/card.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

const useMutationDeleteCard = () => {
  const queryClient = useQueryClient()

  return useMutation<
    APIResponse<null>,
    Error,
    { cardId: number; projectId: number }
  >({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cards.lists() })
    },
    onError: (error) => {
      console.error('Error deleting card:', error)
    },
  })
}

export { useMutationDeleteCard }

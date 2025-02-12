import { UpdateCardRequest, updateCard } from '@/services/card.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

const useMutationUpdateCard = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, Error, UpdateCardRequest>({
    mutationFn: updateCard,
    onSuccess: (_, { cardId }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.cards.detail(cardId),
      })
    },
    onError: (error) => {
      console.error('Error updating card:', error)
    },
  })
}

export { useMutationUpdateCard }

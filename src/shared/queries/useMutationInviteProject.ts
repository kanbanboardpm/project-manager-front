import { inviteProject, InviteProjectRequest } from '@/services/member.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

const useMutationInviteProject = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    APIResponse<null>,
    AxiosError,
    InviteProjectRequest
  >({
    mutationFn: inviteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.members.lists() })
    },
    onError: (error) => {
      console.error('초대 실패:', error.response?.data)
    },
  })
  return mutation
}

export { useMutationInviteProject }

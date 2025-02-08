import { inviteProject, InviteProjectRequest } from '@/services/member.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { APIResponse } from '../types/response'

const QUERY_KEYS = {
  members: {
    all: ['members'] as const,
    lists: () => [...QUERY_KEYS.members.all, 'list'] as const,
    detail: (id: number) => [...QUERY_KEYS.members.all, id] as const,
  },
} as const

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

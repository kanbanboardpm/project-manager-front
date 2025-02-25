import axiosApi from '@/helper/api_helper'
import {
  DeleteMemberRequest,
  InviteProjectRequest,
} from '@/shared/types/member'
import { APIResponse } from '@/shared/types/response'

export const inviteProject = async ({
  projectId,
  emailList,
}: InviteProjectRequest) => {
  const response = await axiosApi.post(`projects/invites/${projectId}`, {
    emails: emailList,
  })
  return response.data
}

export const deleteMember = async ({
  projectId,
  userId,
}: DeleteMemberRequest) => {
  const response = await axiosApi.delete(`projects/${projectId}/${userId}`)
  return response.data
}

// TEST
export const acceptMember = async ({ inviteId }: { inviteId: number }) => {
  const response = await axiosApi.post(`projects/accept/${inviteId}`)
  return response.data
}

export const getInviteProject = async (): Promise<APIResponse<string[]>> => {
  const response = await axiosApi.get('projects/invites')
  return response.data
}

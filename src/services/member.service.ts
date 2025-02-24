import axiosApi from '@/helper/api_helper'

export interface Member {
  email: string
  nickname: string
  image_url: string
}
export interface InviteProjectRequest {
  projectId: number
  emailList: string[]
}

export interface DeleteMemberRequest {
  projectId: number
  userId: number
}

export const inviteProject = async ({
  projectId,
  emailList,
}: InviteProjectRequest) => {
  const response = await axiosApi.post(`projects/invite/${projectId}`, {
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

import axiosApi from '@/helper/api_helper'

export interface InviteProjectRequest {
  projectId: number
  emailList: string[]
}

export const inviteProject = async ({
  projectId,
  emailList,
}: InviteProjectRequest) => {
  const response = await axiosApi.post(
    `projects/invite/${projectId}`,
    emailList,
  )
  return response.data
}

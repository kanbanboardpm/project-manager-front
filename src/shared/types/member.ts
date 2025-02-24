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

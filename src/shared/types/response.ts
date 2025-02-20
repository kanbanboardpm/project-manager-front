import { HttpStatusCode } from 'axios'

export interface APIResponse<T> {
  httpStatusCode: HttpStatusCode
  message: string
  data: T | null
}

export interface UserResponse {
  email: string
  nickname: string
  image_url: string
}

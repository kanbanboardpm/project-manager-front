import axiosApi from '@/helper/api_helper'

interface LoginRequest {
  email: string
  password: string
}

interface SignupRequest {
  email: string
  password: string
  nickname: string
}

// export const postLogin = async (payload: LoginRequest) => {
//   const response = await axiosApi.post('/api/users/login', payload)
//   return response?.data || {}
// }

interface LoginResponse {
  token: string
}

export const postLogin = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const response = await axiosApi.post('/api/users/login', payload)
  return response.data
}

// export const postSignup = async (payload: SignupRequest) => {
//   const response = await axiosApi.post('/api/users', payload)
//   return response?.data || {}
// }

export const postSignup = async (payload: SignupRequest) => {
  const response = await axiosApi.post('/api/users', payload)
  return response?.data || {}
}

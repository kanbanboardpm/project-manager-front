import axiosApi from '@/helper/api_helper'
import useSessionStore from '@/store/useSessionStore'

interface LoginRequest {
  email: string
  password: string
}

interface SignupRequest {
  email: string
  password: string
  nickname: string
}

interface LoginResponse {
  token: string
}

export const postLogin = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const response = await axiosApi.post('/api/users/login', payload)
  return response.data
}

export const postLogout = async () => {
  console.log('로그아웃 시도')
  console.log('현재 토큰:', useSessionStore.getState()?.access_token) // 토큰이 있는지 확인

  try {
    const response = await axiosApi.get('/api/users/logout')
    console.log('로그아웃 응답:', response)

    document.cookie =
      'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    return response.data
  } catch (error) {
    console.log('로그아웃 에러:', error)
    throw error
  }
}

export const postSignup = async (payload: SignupRequest) => {
  console.log('TEST:::', payload)
  const response = await axiosApi.post('/api/users', payload)
  return response?.data || {}
}

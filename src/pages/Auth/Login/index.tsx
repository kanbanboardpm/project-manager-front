import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import useSessionStore from '@/store/useSessionStore'
// import useUserStore from '@/store/useUserStore'
import { postLogin } from '@/services/auth.service'
import logoIcon from '@/assets/images/logo-text.png'
import showIcon from '@/assets/images/Auth/show.png'
import hideIcon from '@/assets/images/Auth/hide.png'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { validateLogin } from '@/utils/validation'
import axios from 'axios'

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const setSessionInfo = useSessionStore((state) => state.setSessionInfo)
  // const setUser = useUserStore((state) => state.setUser)

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      // 세션 정보 저장
      setSessionInfo({
        access_token: data.token,
        isAuthenticated: true,
      })
      navigate('/')
    },
  })

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: async (data) => {
      const errors = validateLogin(data.email, data.password)

      return {
        values: Object.keys(errors).length === 0 ? data : {},
        errors: Object.entries(errors).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: {
              type: 'validation',
              message: value,
            },
          }),
          {},
        ),
      }
    },
  })
  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data)
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : '로그인에 실패했습니다. 다시 시도해주세요.'

      form.setError('root', { message })
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white">
      <div className="flex flex-col items-center sm:p-10 p-6 gap-4 sm:w-[520px] w-[300px] bg-white border sm:border-modalBorder sm:rounded-modal">
        <img
          src={logoIcon}
          alt="Project Manager 2025"
          className="sm:w-[300px] w-[200px] h-auto"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="이메일을 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 입력하세요"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      aria-label={
                        showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                      }
                    >
                      <img
                        className="sm:w-5 sm:h-5 w-4 h-4"
                        src={showPassword ? showIcon : hideIcon}
                        alt={showPassword ? '비밀번호 보기' : '비밀번호 숨기기'}
                      />
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-category-red text-sm">
                {form.formState.errors.root.message}
              </p>
            )}

            <div className="flex justify-end items-center gap-2 sm:text-sm text-xs">
              <button type="button" className="text-modalPlaceholder">
                비밀번호 찾기
              </button>
              <span className="text-modalBorder">|</span>
              <Link to="/signup" className="text-modalPlaceholder">
                회원가입
              </Link>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full sm:h-[50px] h-[40px] bg-[#82CD47] text-white rounded-button font-semibold sm:text-base text-sm disabled:opacity-50"
            >
              {loginMutation.isPending ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}

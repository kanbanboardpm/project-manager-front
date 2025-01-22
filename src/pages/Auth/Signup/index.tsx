import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import logoIcon from '@/assets/images/logo-text.png'
import showIcon from '@/assets/images/Auth/show.png'
import hideIcon from '@/assets/images/Auth/hide.png'
import {
  validateSignUp,
  SignUpFormData,
  SignUpValidationError,
} from '@/utils/validation'
import { cn } from '@/lib/utils'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
  const [errors, setErrors] = useState<SignUpValidationError>({})
  const [touched, setTouched] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordConfirm: false,
  })
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    const validationErrors = validateSignUp({
      ...formData,
      [name]: value,
    })

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof SignUpFormData],
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setTouched({
      email: true,
      nickname: true,
      password: true,
      passwordConfirm: true,
    })

    const validationErrors = validateSignUp(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      // 회원가입 API 호출
      console.log('Form submitted:', formData)
    }
  }

  const getInputClassName = (fieldName: keyof SignUpFormData) => {
    return cn(
      'w-full sm:h-[60px] h-[40px] px-4 border rounded-input text-sm font-normal font-pretendard text-modalPlaceholder',
      touched[fieldName] && errors[fieldName]
        ? 'border-category-red focus:border-category-red'
        : 'border-modalBorder focus:border-primary',
    )
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white sm:bg-white">
      <div className="flex flex-col items-center sm:p-10 p-6 gap-4 sm:w-[520px] w-[300px] bg-white border sm:border-modalBorder sm:rounded-modal">
        <img
          src={logoIcon}
          alt="Project Manager 2025"
          className="sm:w-[300px] w-[200px] h-auto"
        />
        <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="이메일을 입력하세요"
              className={getInputClassName('email')}
            />
            {touched.email && errors.email && (
              <p className="px-2 text-category-red mt-1 text-sm">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="닉네임을 입력하세요"
              className={getInputClassName('nickname')}
            />
            {touched.nickname && errors.nickname && (
              <p className="px-2 text-category-red mt-1 text-sm">
                {errors.nickname}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="비밀번호를 입력하세요"
                className={getInputClassName('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPassword ? (
                  <img
                    className="sm:w-5 sm:h-5 w-4 h-4"
                    src={showIcon}
                    alt="비밀번호 보기"
                  />
                ) : (
                  <img
                    src={hideIcon}
                    alt="비밀번호 숨기기"
                    className="sm:w-5 sm:h-5 w-4 h-4"
                  />
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="px-2 text-category-red mt-1 text-sm">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="비밀번호를 한 번 더 입력하세요"
                className={getInputClassName('passwordConfirm')}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={
                  showPasswordConfirm ? '비밀번호 숨기기' : '비밀번호 보기'
                }
              >
                {showPasswordConfirm ? (
                  <img
                    className="sm:w-5 sm:h-5 w-4 h-4"
                    src={showIcon}
                    alt="비밀번호 보기"
                  />
                ) : (
                  <img
                    src={hideIcon}
                    alt="비밀번호 숨기기"
                    className="sm:w-5 sm:h-5 w-4 h-4"
                  />
                )}
              </button>
            </div>
            {touched.passwordConfirm && errors.passwordConfirm && (
              <p className="px-2 text-category-red mt-1 text-sm">
                {errors.passwordConfirm}
              </p>
            )}
          </div>

          <div className="flex justify-end items-center gap-2 sm:text-sm text-xs">
            <span className="text-modalPlaceholder">이미 계정이 있습니다</span>
            <Link to="/login" className="text-[#82CD47]">
              로그인하기
            </Link>
          </div>

          <button
            type="submit"
            className="w-full sm:h-[50px] h-[40px] bg-[#82CD47] text-white rounded-button font-semibold sm:text-base text-sm"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}

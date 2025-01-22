import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import logoIcon from '@/assets/images/logo-text.png'
import showIcon from '@/assets/images/Auth/show.png'
import hideIcon from '@/assets/images/Auth/hide.png'
import { validateLogin, ValidationError } from '@/utils/validation'
interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [errors, setErrors] = useState<ValidationError>({})
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const validationErrors = validateLogin(formData.email, formData.password)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      // 로그인 처리 api 로직
      console.log('Form submitted:', formData)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white sm:bg-white ">
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
              placeholder="이메일을 입력하세요"
              className="w-full sm:h-[60px] h-[40px] px-4 border border-modalBorder rounded-input text-sm font-normal font-pretendard text-modalPlaceholder"
            />
            {errors.email && (
              <p className="px-2 text-category-red mt-1 text-sm">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className="w-full sm:h-[60px] h-[40px] px-4 border border-modalBorder rounded-input text-sm font-normal font-pretendard text-modalPlaceholder"
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
            {errors.password && (
              <p className="px-2 text-category-red mt-1 text-sm">
                {errors.password}
              </p>
            )}
          </div>
          {/* <div>아이디 틀렸을때 나옴</div> */}
          <div className="flex justify-end items-center gap-2  sm:text-sm text-xs">
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
            className="w-full sm:h-[50px] h-[40px]  bg-[#82CD47] text-white rounded-button font-semibold sm:text-base text-sm"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}

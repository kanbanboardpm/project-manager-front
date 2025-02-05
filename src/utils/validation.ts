import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('유효한 이메일 주소를 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
})

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('유효한 이메일 주소를 입력해주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8글자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$/,
        '대소문자 포함 영문 + 숫자 + 특수문자를 최소 1글자씩 포함합니다.\n비밀번호는 최소 8글자 이상이어야 합니다.',
      ),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    nickname: z
      .string()
      .min(1, '닉네임을 입력해주세요.')
      .max(10, '닉네임은 10자 이하여야 합니다.')
      .regex(
        /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]+$/,
        '닉네임은 한글 또는 영문이 포함되어야 합니다.',
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>

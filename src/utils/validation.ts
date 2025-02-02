export interface ValidationError {
  email?: string
  password?: string
}

export interface SignUpFormData {
  email: string
  password: string
  passwordConfirm: string
  nickname: string
}

export interface SignUpValidationError {
  email?: string
  password?: string
  passwordConfirm?: string
  nickname?: string
}

//로그인 유효성 검사
export const validateLogin = (
  email: string,
  password: string,
): ValidationError => {
  const errors: ValidationError = {}

  // 이메일 검사
  if (!email) {
    errors.email = '이메일을 입력해주세요.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = '유효한 이메일 주소를 입력해주세요.'
  }

  // 비밀번호 검사
  if (!password) {
    errors.password = '비밀번호를 입력해주세요.'
  }
  // else if (password.length < 8) {
  //   errors.password = '비밀번호는 8자 이상이어야 합니다.'
  // } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
  //   errors.password = '비밀번호는 영문과 숫자를 포함해야 합니다.'
  // }

  return errors
}

//회원가입 유효성 검사
export const validateSignUp = (
  formData: SignUpFormData,
): SignUpValidationError => {
  const errors: SignUpValidationError = {}

  // 이메일 검사
  if (!formData.email) {
    errors.email = '이메일을 입력해주세요.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    errors.email = '유효한 이메일 주소를 입력해주세요.'
  }

  // 비밀번호 검사
  if (!formData.password) {
    errors.password = '비밀번호를 입력해주세요.'
  } else if (formData.password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.'
  }
  // else if (
  //   !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)
  // ) {
  //   errors.password = '비밀번호는 영문과 숫자를 포함해야 합니다.'
  // }

  // 비밀번호 확인 검사
  if (!formData.passwordConfirm) {
    errors.passwordConfirm = '비밀번호 확인을 입력해주세요.'
  } else if (formData.password !== formData.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
  }

  // 닉네임 검사
  if (!formData.nickname) {
    errors.nickname = '닉네임을 입력해주세요.'
  } else if (formData.nickname.length > 10) {
    errors.nickname = '닉네임은 10자 이하여야 합니다.'
  } else if (
    !/^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]+$/.test(formData.nickname)
  ) {
    errors.nickname = '닉네임은 한글 또는 영문이 포함되어야 합니다.'
  }

  return errors
}

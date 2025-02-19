import { Camera } from 'lucide-react'
import { Input } from '@/shared/ui/common/input'
import { Button } from '@/shared/ui/common/button'
import { useForm } from 'react-hook-form'
import { useQueryUser } from '@/shared/queries/useQueryUser'
import { useMutationUpdateProfile } from '@/shared/queries/useMutationProfile'
import { UpdateProfileRequest } from '@/services/user.service'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

const formSchema = z.object({
  nickname: z.string().min(1, '닉네임은 1글자 이상 입력해야 합니다.'),
  image_url: z.string().optional(),
})
type FormValues = z.infer<typeof formSchema>

export default function ProfileContainer() {
  const { data: profileData, isPending } = useQueryUser()
  const updateProfileMutation = useMutationUpdateProfile()
  const profile = profileData?.data
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: profile?.nickname,
      image_url: profile?.image_url,
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setValue('image_url', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageRemove = () => {
    setValue('image_url', '')
  }

  const onSubmit = (data: UpdateProfileRequest) => {
    updateProfileMutation.mutate(data)
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex items-center justify-center w-full mx-auto bg-white rounded-md">
      <div className="flex flex-col items-center justify-center max-w-lg ">
        <h1 className="text-xl font-medium mb-8">프로필</h1>

        {/* 프로필 이미지 */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={watch('image_url') || profile?.image_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <label className="absolute bottom-0 right-0 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </label>
        </div>

        <div className="flex h-auto items-center justify-center gap-3 mb-5">
          <Link
            to="/password"
            className="h-auto p-2 inline-flex items-center justify-center gap-[2px] whitespace-nowrap rounded-button text-xs md:text-sm font-medium transition-colors  disabled:pointer-events-none border  border-primary bg-white text-primary hover:bg-primary hover:text-white "
          >
            비밀번호 변경하기
          </Link>
          <Button
            variant="modalOutline"
            className="text-xs "
            onClick={handleImageRemove}
            type="button"
          >
            사진 제거
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div>
            <label className="text-sm">닉네임</label>
            <Input
              placeholder="닉네임을 입력하세요"
              defaultValue={profile?.nickname}
              {...register('nickname')}
            />
            {errors.nickname && (
              <p className="text-red-500 text-xs mt-1">
                {errors.nickname.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm">이메일</label>
            <Input value={profile?.email} disabled className="bg-gray-50" />
          </div>
          <Button
            type="submit"
            variant={!isDirty ? 'disabled' : 'default'}
            className="w-full"
            disabled={!isDirty || updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? '처리중...' : '수정하기'}
          </Button>
        </form>
      </div>
    </div>
  )
}

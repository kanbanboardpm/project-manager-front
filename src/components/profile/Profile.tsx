import { ChangeEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Camera } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/common/form'
import { Input } from '@/shared/ui/common/input'
import { Button } from '@/shared/ui/common/button'
import { ADDITIONAL_DATA } from '@/shared/mock/cardDetail'

interface ProfileData {
  nickname: string
  image_url?: string
  email: string
}

interface ProfileFormData {
  nickname: string
  image_url?: string
}

const fetchProfile = async (): Promise<ProfileData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        nickname: ADDITIONAL_DATA.assignee.name,
        email: ADDITIONAL_DATA.assignee.email,
      })
    }, 500)
  })
}

const updateProfile = async (data: ProfileFormData): Promise<ProfileData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...data,
        email: ADDITIONAL_DATA.assignee.email,
      })
    }, 500)
  })
}

export default function ProfileEdit() {
  const queryClient = useQueryClient()

  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  })

  const form = useForm<ProfileFormData>({
    defaultValues: {
      nickname: '',
    },
  })

  useEffect(() => {
    if (profileData) {
      form.reset({
        nickname: profileData.nickname,
        image_url: profileData.image_url,
      })
    }
  }, [profileData, form])

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  const handleSubmit = (data: ProfileFormData) => {
    mutation.mutate(data)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        form.setValue('image_url', reader.result as string)
        console.log('이미지 URL:', form.getValues('image_url'))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageRemove = () => {
    form.setValue('image_url', undefined)
  }

  if (isLoadingProfile) {
    return <div className="flex justify-center items-center">로딩중...</div>
  }

  return (
    <div className="flex  items-center justify-center w-full mx-auto bg-white rounded-md">
      <div className="flex flex-col items-center justify-center max-w-lg ">
        <h1 className="text-xl font-medium mb-8">프로필</h1>

        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={form.watch('image_url') || '/api/placeholder/96/96'}
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

        <Button
          variant="outline"
          className="text-xs mb-8"
          onClick={handleImageRemove}
          type="button"
        >
          사진 제거
        </Button>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">닉네임</FormLabel>
                  <FormControl>
                    <Input placeholder="닉네임을 입력하세요" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-sm">이메일</FormLabel>
              <Input
                value={profileData?.email}
                disabled
                className="bg-gray-50"
              />
            </FormItem>

            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? '처리중...' : '수정하기'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

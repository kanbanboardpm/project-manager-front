import { CATEGORY_COLORS } from '@/shared/constants/color'
import { MOCK_CATEGORY } from '@/shared/mock/category'
import { Button } from '@/shared/ui/common/button'
import { Input } from '@/shared/ui/common/input'
import { Icon } from '@/shared/ui/Icon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(50),
  color: z.string().min(1),
})

export default function Category() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      color: '#4285F4',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const [isOpenColor, setIsOpenColor] = useState(false)

  return (
    <div className="pt-6 lg:pt-8 w-[307px] md:w-[477px] lg:w-[996px] mx-auto flex flex-col gap-6">
      <div className="font-semibold text-xl text-center">카테고리 관리</div>
      <form
        className="flex gap-2 items-end md:gap-3 lg:gap-6 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 w-20 md:w-[140px] lg:w-[200px]">
          <label className="font-semibold text-xs md:text-sm">이름</label>
          <Input
            {...register('name')}
            placeholder="카테고리 이름을 입력하세요"
            className={`h-[30px] md:h-10 placeholder:text-[10px] placeholder:md:text-xs placeholder:lg:text-sm text-[10px] md:text-xs lg:text-sm`}
          />
        </div>
        <div className="flex flex-col gap-1 w-[140px] md:w-[200px] lg:w-[350px]">
          <label className="font-semibold text-xs md:text-sm">설명</label>
          <Input
            {...register('description')}
            placeholder="카테고리 설명을 50자 이내로 입력하세요"
            className={`h-[30px] md:h-10 placeholder:text-[10px] text-[10px] md:text-xs lg:text-sm placeholder:md:text-xs placeholder:lg:text-sm`}
          />
        </div>
        <div className="relative flex flex-col gap-3 w-[30px] md:w-[34px] lg:w-[64px]">
          <label className="font-semibold text-xs md:text-sm">색상</label>
          <div
            className="flex lg:gap-1 mb-1.5 md:mb-3 "
            onClick={() => setIsOpenColor(!isOpenColor)}
          >
            <button
              type="button"
              // onClick={() => setValue('color', color, { shouldValidate: true })}
              className="w-4 h-4 md:w-5 md:h-5 lg:w-[42px] rounded-card"
              style={{ backgroundColor: getValues('color') }}
            />
            <Icon
              icon={isOpenColor ? 'AngleDoubleUp' : 'AngleDoubleDown'}
              size={14}
              className="cursor-pointer"
            />
          </div>
          <div
            className={`${isOpenColor ? 'block' : 'hidden'} border border-modalBorder bg-white p-0.5 rounded-card absolute top-12 md:top-14 z-50 -left-1 flex flex-col gap-0.5`}
          >
            {Object.entries(CATEGORY_COLORS).map(([key, color]) => {
              return (
                <button
                  key={key}
                  onClick={() => {
                    setValue('color', color, { shouldValidate: true })
                    setIsOpenColor(false)
                  }}
                  className={`w-[30px] h-4 md:h-5 md:w-[34px] lg:w-[60px] rounded-card`}
                  style={{ backgroundColor: color }}
                />
              )
            })}
          </div>
        </div>
        <Button
          variant={isValid ? 'default' : 'disabled'}
          className="px-2 lg:px-6"
        >
          <Icon icon="Plus" size={12} className="md:w-5 md:h-5 lg:hidden" />
          <div className="hidden lg:block">생성</div>
        </Button>
      </form>
      <div>
        <div className="border-b border-bodyBorder flex py-1.5 md:py-1 px-1 lg:px-0 lg:w-[740px] mx-auto">
          <div className="font-normal text-xs md:text-sm w-8 md:w-[46px] md:pl-1 lg:w-[92px] lg:pl-[30px]">
            색상
          </div>
          <div className="font-normal text-xs md:text-sm w-[78px] md:w-[135px] lg:w-[185px]">
            이름
          </div>
          <div className="font-normal text-xs md:text-sm w-[149px] md:w-[222px] lg:w-[309px]">
            설명
          </div>
        </div>
        {MOCK_CATEGORY.map((category) => {
          return (
            <div
              key={category.id}
              className="h-10 md:h-[45px] border-b border-bodyBorder flex items-center w-fit mx-auto"
            >
              <div className="w-[38px] md:w-[46px] lg:w-[92px]">
                <div
                  className="w-4 h-4 md:w-5 md:h-5 rounded-card ml-1.5 lg:ml-8"
                  style={{ backgroundColor: category.color }}
                />
                <Icon icon="AngleDoubleDown" className="hidden" />
              </div>
              <div className="w-[78px] md:w-[135px] lg:w-[185px]">
                <div className="text-xs md:text-sm truncate">
                  {category.name}
                </div>
                <Input className="w-[70px] hidden" />
              </div>
              <div className="w-[149px] md:w-[222px] lg:w-[309px]">
                <div className="text-xs md:text-sm truncate">
                  {category.description}
                </div>
                <Input className="w-[140px] hidden" />
              </div>
              <div className="flex gap-0.5 md:gap-1 lg:gap-2 justify-end w-[42px] md:w-[60px] lg:w-[122px] md:ml-2 lg:ml-0 lg:mr-8">
                <Button variant="category" className="p-1 md:p-2">
                  <Icon
                    icon="Update"
                    size={12}
                    className={`fill-white lg:hidden`}
                  />
                  <span className="hidden lg:block">수정</span>
                </Button>
                <div className="hidden">
                  <Button variant="categoryDelete" className="p-1 md:p-2">
                    <Icon
                      icon="Delete"
                      size={12}
                      className={`fill-white lg:hidden`}
                    />
                    <span className="hidden lg:block">삭제</span>
                  </Button>
                  <Button variant="category" className="p-1 md:p-2">
                    <Icon
                      icon="Check"
                      size={12}
                      className={`fill-white lg:hidden`}
                    />
                    <span className="hidden lg:block">완료</span>
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Textarea } from '@/shared/ui/textarea'
import { useModalStore } from '@/store/useModalStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../shared/ui/form'
import { Input } from '../../shared/ui/input'
import { ModalKey } from './ModalController'

const formSchema = z
  .object({
    title: z.string().min(1),
    content: z.string(),
    startDate: z.date({ required_error: '시작 날짜를 선택하세요' }),
    endDate: z.date({ required_error: '종료 날짜를 선택하세요' }),
    category: z
      .string({ required_error: '카테고리를 선택하세요' })
      .min(1, '카테고리를 선택하세요'),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '종료 날짜는 시작 날짜보다 빠를 수 없습니다.',
    path: ['endDate'],
  })

export default function CreateCardModal({ modalId }: { modalId: ModalKey }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      startDate: undefined,
      endDate: undefined,
      category: '',
    },
  })

  const { closeModal } = useModalStore()

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    closeModal('create-card')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => closeModal(modalId)}
      />
      <div className="relative bg-white w-[350px] md:w-[500px] h-auto rounded-modal p-6 flex flex-col gap-4">
        <div className="font-semibold text-base">카드 추가</div>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="md:px-4 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 md:gap-4">
                    <FormLabel>제목</FormLabel>
                    <FormControl className="flex-1">
                      <Input
                        placeholder="제목을 입력하세요"
                        {...field}
                        className={`${form.formState.errors.title ? 'border-warning' : ''}  text-xs md:text-sm h-10`}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3 md:gap-4">
                    <FormLabel className="whitespace-pre">
                      상세{'\n'}정보
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="상세 정보를 입력하세요"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 md:gap-4">
                      <FormLabel className="whitespace-pre">기간</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              className="w-[105px] md:w-[154px]  h-10"
                              variant="date"
                            >
                              {field.value ? (
                                format(field.value, 'PPP', { locale: ko })
                              ) : (
                                <div className="text-modalPlaceholder">
                                  시작일
                                </div>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => field.onChange(date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className="text-lg text-modalPlaceholder">~</span>
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 md:gap-4">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              className="w-[105px] md:w-[154px]  h-10"
                              variant="date"
                            >
                              {field.value ? (
                                format(field.value, 'PPP', { locale: ko })
                              ) : (
                                <div className="text-modalPlaceholder">
                                  마감일
                                </div>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => field.onChange(date)}
                              disabled={(date) =>
                                date < form.getValues('startDate')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 md:gap-4">
                    <FormLabel className="whitespace-pre">카테고리</FormLabel>
                    <div className="[&_[data-placeholder]]:text-modalPlaceholder w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="카테고리를 선택하세요"
                              className="placeholder:text-modalPlaceholder"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="board">Board</SelectItem>
                          <SelectItem value="comment">Comment</SelectItem>
                          <SelectItem value="ci-cd">CI/CD</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="modalOutline"
                onClick={() => closeModal(modalId)}
              >
                취소
              </Button>
              <Button
                variant={`${form.formState.isValid ? 'modal' : 'disabled'}`}
              >
                생성
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
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
import { Modal } from '../../shared/ui/modal/index'

const formSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().min(1),
    startDate: z.date({ required_error: '시작 날짜를 선택하세요' }),
    endDate: z.date({ required_error: '종료 날짜를 선택하세요' }),
    category: z.string(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '종료 날짜는 시작 날짜보다 빠를 수 없습니다.',
    path: ['endDate'],
  })

export default function CreateCardModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
      startDate: undefined,
      endDate: undefined,
      category: '',
    },
  })

  return (
    <Modal title="카드 추가">
      <Form {...form}>
        <form>
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
                    className={`${form.formState.errors.title ? 'border-warning' : ''} `}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 md:gap-4">
                <FormLabel className="whitespace-pre">상세{'\n'}정보</FormLabel>
                <FormControl>
                  <Input
                    placeholder="상세 정보를 입력하세요"
                    {...field}
                    className={`${form.formState.errors.content ? 'border-warning' : ''} `}
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
                        <Button className="w-[154px]">
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ko })
                          ) : (
                            <div>시작일</div>
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
            <span className="text-lg">~</span>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 md:gap-4">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="w-[154px]">
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ko })
                          ) : (
                            <div>마감일</div>
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
          </div>
        </form>
      </Form>
    </Modal>
  )
}

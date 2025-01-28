import { Button } from '@/shared/ui/button'
import { useModalStore } from '@/store/useModalStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '../../shared/ui/form'
import { Input } from '../../shared/ui/input'
import { ModalKey } from './ModalController'

const formSchema = z.object({
  title: z.string().min(1),
})

export default function UpdateSectionModal({ modalId }: { modalId: ModalKey }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: 'Frontend',
    },
  })

  const { closeModal } = useModalStore()

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    closeModal('update-section')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => closeModal(modalId)}
      />
      <div className="relative bg-white w-[300px] md:w-[400px] h-auto rounded-modal p-6  flex flex-col gap-4">
        <div className="font-semibold text-base">섹션 수정</div>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="제목을 입력하세요"
                      {...field}
                      className={`${form.formState.errors.title ? 'border-warning' : ''} `}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-3 justify-end">
              <Button
                variant="modalOutline"
                onClick={() => closeModal(modalId)}
              >
                취소
              </Button>
              <Button
                variant={`${form.formState.errors.title ? 'disabled' : 'modal'}`}
              >
                수정
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

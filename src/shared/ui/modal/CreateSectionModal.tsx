import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Modal } from '.'
import { Form, FormControl, FormField, FormItem } from '../form'
import { Input } from '../input'

const formSchema = z.object({
  title: z.string().min(1),
})

export default function CreateSectionModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
    },
  })

  return (
    <Modal title="섹션 추가" width="w-[300px] md:w-[400px]">
      <Form {...form}>
        <form>
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
        </form>
      </Form>
    </Modal>
  )
}

import { IconMail } from '@/assets/icons/icon-mail'
import ModalClick from '@/components/ModalClick'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { SentMailSchema } from '@/core/zod'
import { useSentMailMutation } from '@/hooks/useSentMailMutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function SentEmail() {
  const form = useForm<z.infer<typeof SentMailSchema>>({
    resolver: zodResolver(SentMailSchema),
    defaultValues: {
      email: ''
    }
  })
  const sentEmailMutation = useSentMailMutation(form)
  const onSubmit = () => {
    sentEmailMutation.mutate()
  }
  return (
    <div className='flex items-center justify-center flex-wrap '>
      <p className='shrink-0'>Không nhận được email xác thực?</p>

      <ModalClick
        children={<p className='cursor-pointer text-main hover:underline '>Nhấn vào đây để thử lại.</p>}
        render={
          <div className=' bg-white rounded-md h-80 md:h-96 p-4 w-[350px] md:w-2xl flex flex-col items-center justify-center gap-3 '>
            <h2 className='text-head font-semibold'>Gửi lại mã xác nhận</h2>
            <p className='text-sub2 text-gray text-center'>
              Bạn hãy chắc rằng đã kiểm tra Spam và hộp thư rác nếu không nhận được email.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=' w-[90%] md:w-md space-y-4 ' noValidate>
                <FormField
                  control={form.control}
                  name={'email'}
                  render={({ field }) => (
                    <FormItem className=' w-full'>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='Nhập email'
                          type='email'
                          className='w-full focus:outline-0 mt-1'
                          {...field}
                          icon={<IconMail />}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  loading={sentEmailMutation.isPending}
                  className='w-full text-lg cursor-pointer text-white h-10 bg-main py-3 hover:bg-main/80 duration-300 hover:shadow-lg '
                  type='submit'
                >
                  Gửi lại mã
                </Button>
              </form>
            </Form>
          </div>
        }
      ></ModalClick>
    </div>
  )
}

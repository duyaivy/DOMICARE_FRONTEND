import { numberConstants } from '@/configs/consts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import IconSeacrh from '@/assets/icons/icon-search'
import { Button } from '../ui/button'

const SearchChema = z.object({
  name: z.string().min(numberConstants.TWO)
})

export default function Search() {
  const form = useForm<z.infer<typeof SearchChema>>({
    resolver: zodResolver(SearchChema),
    defaultValues: {
      name: ''
    }
  })
  const onSubmit = () => {
    console.log(123)
  }
  return (
    <div className='flex flex-col md:flex-row items-center justify-between pb-6 gap-4 '>
      <h2 className='text-head text-main font-semibold shrink-0'>Tài nguyên làm sạch</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=' w-full  md:w-md space-y-4 ' noValidate>
          <FormField
            control={form.control}
            name={'name'}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    autoComplete='off'
                    placeholder='Tìm kiếm'
                    type='email'
                    className='w-full h-12 focus:ring-0'
                    {...field}
                    classNameInput='pr-0 p-1.5 '
                    icon={
                      <Button type='submit' className='bg-main w-15 cursor-pointer  hover:bg-main/80 '>
                        <IconSeacrh className='fill-white' />
                      </Button>
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

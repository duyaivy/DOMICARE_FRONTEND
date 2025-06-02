import { Fragment } from 'react'
import DateTimeSelect from '@/components/DateTimeSelect'
import { DEFAULT_DATE_OF_BIRTH } from '@/configs/consts'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { MapPinned, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUpdateUserMutation } from '@/core/queries/user.query'
import { handleError422 } from '@/utils/handleErrorAPI'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const BookingSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên khách hàng'),
  dateOfBirth: z.date(),
  address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
  location: z.string().min(1, 'Vui lòng nhập địa điểm'),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  notes: z.string().optional()
})

interface Props {
  currentRow: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingActionDialog({ currentRow, open, onOpenChange }: Props) {
  const schema = BookingSchema
  type BookingForm = z.infer<typeof schema>
  const form = useForm<BookingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...currentRow,
      dateOfBirth: new Date(currentRow.dateOfBirth || DEFAULT_DATE_OF_BIRTH)
    }
  })

  const userUpdateMutation = useUpdateUserMutation({
    handleError: (error: unknown) => handleError422({ error, form, fieldName: 'name' })
  })

  const onSubmit = async (formData: BookingForm) => {
    try {
      const dataApi = {
        ...formData,
        dateOfBirth: formData.dateOfBirth.toISOString()
      }
      await userUpdateMutation.mutateAsync(dataApi)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='md:max-w-3xl'>
        <DialogHeader className='text-left'>
          <DialogTitle className='capitalize text-lg font-bold'>Chỉnh sửa lịch hẹn</DialogTitle>
          <DialogDescription>Cập nhật thông tin lịch hẹn. Nhấn lưu để thực hiện thay đổi.</DialogDescription>
        </DialogHeader>
        <div className='-mr-4 w-full h-[42rem] overflow-y-auto py-1 px-0.5'>
          <Fragment>
            <Form {...form}>
              <form
                id='booking-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full md:w-full space-y-2 mb-10'
                noValidate
              >
                <div className='grid grid-cols-12 gap-4 my-4'>
                  <div className='col-span-12'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên khách hàng</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete='off'
                              placeholder='Nhập tên khách hàng'
                              type='text'
                              className='w-full focus:outline-0 mt-1'
                              {...field}
                              icon={<UserIcon />}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='dateOfBirth'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thời gian hẹn</FormLabel>
                          <FormControl>
                            <DateTimeSelect
                              onChange={field.onChange}
                              value={field.value}
                              errorMessage={form.formState.errors.dateOfBirth?.message}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='address'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa chỉ</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Nhập địa chỉ'
                              autoComplete='off'
                              className='w-full focus:outline-0 mt-1'
                              {...field}
                              icon={<MapPinned />}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='location'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa điểm</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Nhập địa điểm'
                              autoComplete='off'
                              className='w-full focus:outline-0 mt-1'
                              {...field}
                              icon={<MapPinned />}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='status'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trạng thái</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Chọn trạng thái' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='pending'>Chờ xác nhận</SelectItem>
                              <SelectItem value='confirmed'>Đã xác nhận</SelectItem>
                              <SelectItem value='completed'>Hoàn thành</SelectItem>
                              <SelectItem value='cancelled'>Đã hủy</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='notes'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ghi chú</FormLabel>
                          <FormControl>
                            <Textarea placeholder='Nhập ghi chú' className='w-full focus:outline-0 mt-1' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </Fragment>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            type='submit'
            loading={userUpdateMutation.isPending}
            className='hover:bg-main bg-neutral-700 cursor-pointer'
            form='booking-form'
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

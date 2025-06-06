import { Fragment, useState } from 'react'

import { STANDARD_DATE_FORMAT_INVERSE } from '@/configs/consts'
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
import { CalendarIcon, MapPin, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { isPeriodic } from '@/core/constants/booking.const'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatDateTime } from '@/core/helpers/date-time'
import dayjs from 'dayjs'
import { cn } from '@/core/lib/utils'
import { IconMail } from '@/assets/icons/icon-mail'
import { ActionBookingForm, ActionBookingSchema } from '@/core/zod/booking.zod'
import { Booking, BookingStatus, BookingUpdateRequest } from '@/models/interface/booking.interface'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Label } from '@/components/ui/label'
import hideEmail from '@/utils/hideEmail'
import { useProductQuery, useUpdateBookingMutation } from '@/core/queries/product.query'
import { isEqual } from 'lodash'
import { useBookingQueryConfig } from '@/hooks/useBookingQueryConfig'
import { useQueryClient } from '@tanstack/react-query'
import { path } from '@/core/constants/path'
import { QueryPrdConfig } from '@/hooks/usePrdQueryConfig'
import { initialParams } from '@/core/constants/initialValue.const'
import Pagination from '@/components/Pagination'
import { Product } from '@/models/interface/product.interface'

interface Props {
  currentRow: Booking
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingActionDialog({ currentRow, open, onOpenChange }: Props) {
  const queryString = useBookingQueryConfig()
  const queryClient = useQueryClient()
  // load product
  const [params, setParams] = useState<QueryPrdConfig>(initialParams)
  const { data } = useProductQuery({ queryString: params })
  const prds = data?.data?.data.data
  const pageController = data?.data?.data.meta
  const currPrd = currentRow?.products?.[0]
  const form = useForm<z.infer<typeof ActionBookingSchema>>({
    resolver: zodResolver(ActionBookingSchema),
    defaultValues: {
      guestEmail: currentRow?.userDTO?.email || '',
      address: currentRow?.address || '',
      startTime: currentRow?.startTime ? new Date(currentRow?.startTime) : undefined,
      name: currentRow?.userDTO?.name || '',
      note: currentRow?.note || '',
      phone: currentRow?.userDTO?.phone || '',
      isPeriodic: currentRow?.isPeriodic ? 'true' : 'false',
      productId: currPrd?.id,
      status: currentRow.bookingStatus as BookingStatus
    }
  })
  const updateBookingMutation = useUpdateBookingMutation()
  const onSubmit = async (formData: ActionBookingForm) => {
    try {
      const dataApi = {
        ...formData,
        startTime: formData.startTime.toISOString(),
        bookingId: currentRow.id,
        isPeriodic: isEqual(currentRow.isPeriodic, 'true') ? true : false
      }
      await updateBookingMutation.mutateAsync(dataApi as BookingUpdateRequest)
      queryClient.invalidateQueries({ queryKey: [path.admin.report, queryString] })
    } catch (error) {
      console.error(error)
    } finally {
      onOpenChange(false)
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
      <DialogContent className='md:max-w-2xl'>
        <DialogHeader className='text-left px-5 pt-2'>
          <DialogTitle className='capitalize text-lg font-bold'>Chỉnh sửa đơn đặt hàng</DialogTitle>
          <DialogDescription>Cập nhật thông tin đơn đặt hàng. Nhấn lưu để thực hiện thay đổi.</DialogDescription>
        </DialogHeader>
        <div className=' w-full  overflow-y-auto py-1 px-5'>
          <Fragment>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full space-y-2 px-4 mb-10'
                id={'booking-form'}
                noValidate
              >
                <div className=''>
                  <Label>Email</Label>
                  <Input
                    disabled
                    value={hideEmail(currentRow?.userDTO?.email)}
                    type='email'
                    className='w-full bg-gray-50 cursor-not-allowed mt-1'
                    icon={<IconMail />}
                  />
                </div>

                <div className=''>
                  <Label>Tên khách hàng</Label>
                  <Input
                    disabled
                    value={currentRow?.userDTO?.name}
                    type='text'
                    className='w-full bg-gray-50 cursor-not-allowed mt-1'
                    icon={<User />}
                  />
                </div>

                <div className='flex gap-2'>
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem className='basis-1/2'>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete='off'
                            placeholder='Nhập số điện thoại'
                            type='text'
                            className='w-full focus:outline-0 mt-1'
                            {...field}
                            icon={<IconMail />}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='startTime'
                    render={({ field }) => (
                      <FormItem className='basis-1/2'>
                        <FormLabel>Thời gian</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'secondary'}
                                className={cn(
                                  'w-full text-left justify-start mt-1 h-9.5 relative',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  formatDateTime(dayjs(field.value), STANDARD_DATE_FORMAT_INVERSE)
                                ) : (
                                  <span>Chọn thời gian</span>
                                )}

                                <CalendarIcon className='absolute right-2.5 ml-auto !h-6 !w-6' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date('1900-01-01')}
                              initialFocus
                              formatters={{
                                formatCaption: (date) => format(date, 'MM - yyyy')
                              }}
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                          icon={<MapPin />}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='isPeriodic'
                  render={({ field }) => (
                    <FormItem className='flex items-center gap-4'>
                      <FormLabel className='mt-2'>Loại dịch vụ bạn chọn:</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className='flex'>
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value={isPeriodic.oneTime} />
                            </FormControl>
                            <FormLabel className=' cursor-pointer'>Một lần</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value={isPeriodic.month} />
                            </FormControl>
                            <FormLabel className=' cursor-pointer'>Định kỳ</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex items-center gap-2  '>
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                      <FormItem className='w-1/2'>
                        <FormLabel>Trạng thái</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={
                            isEqual(field.value, BookingStatus.SUCCESS) || isEqual(field.value, BookingStatus.FAILED)
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Chọn trạng thái' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={BookingStatus.PENDING}>Chờ xác nhận</SelectItem>
                            <SelectItem value={BookingStatus.CANCELLED}>Đã hủy</SelectItem>
                            <SelectItem value={BookingStatus.REJECTED}>Từ chối</SelectItem>
                            <SelectItem value={BookingStatus.ACCEPTED}>Đang tư vấn</SelectItem>
                            <SelectItem value={BookingStatus.SUCCESS}>Hoàn thành</SelectItem>
                            <SelectItem value={BookingStatus.FAILED}>Thất bại</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='productId'
                    render={({ field }) => (
                      <FormItem className='w-1/2'>
                        <FormLabel>Dịch vụ</FormLabel>
                        <Select
                          defaultValue={currPrd?.id?.toString()}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Chọn dịch vụ' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem key={currPrd?.id} value={currPrd?.id?.toString() || ''}>
                              {currPrd?.name}
                            </SelectItem>
                            {prds &&
                              prds.map((prd: Product) => {
                                if (!isEqual(prd?.id, currPrd?.id)) {
                                  return (
                                    <SelectItem key={prd?.id} value={prd?.id?.toString() || ''}>
                                      {prd?.name}
                                    </SelectItem>
                                  )
                                }
                              })}
                            <Pagination<QueryPrdConfig>
                              pageController={pageController}
                              setParams={setParams}
                              params={params}
                            />
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='note'
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel>Ghi chú</FormLabel>
                      <FormControl>
                        <Textarea className='bg-white border-gray-200 h-20' id='note' {...field}></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
            loading={updateBookingMutation.isPending}
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

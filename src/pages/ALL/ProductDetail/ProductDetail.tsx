import { pic13 } from '@/assets/images'
import SectionBgGreen from '@/components/SectionBgGreen'
import SectionBgWhite from '@/components/SectionBgWhite'
import { path } from '@/core/constants/path'
import { AppContext } from '@/core/contexts/app.context'
import { productApi } from '@/core/services/products.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { Fragment, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SlideShow from './SlideShow'
import SecctionInView from '@/components/SecctionInView'
import { CalendarIcon, FlameIcon } from 'lucide-react'
import RatingStars from '@/components/RatingStars/RatingStars'
import Comment from '@/components/Comment'
import { formatCurrentcy } from '@/utils/formatCurrentcy'
import Product from '@/components/Product'
import { useForm } from 'react-hook-form'
import { BookingSchema } from '@/core/zod/booking.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import { bookingApi } from '@/core/services/booking.service'
import { Toast } from '@/utils/toastMessage'
import { handleErrorAPI } from '@/utils/handleErrorAPI'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IconMail } from '@/assets/icons/icon-mail'
import { IconNonEye } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/core/lib/utils'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { isOneTime } from '@/core/constants/booking.const'
import { formatDateTime } from '@/core/helpers/date-time'
import { STANDARD_DATE_FORMAT_INVERSE } from '@/configs/consts'
import dayjs from 'dayjs'

export default function ProductDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { pathname } = useLocation()
  const pathString = pathname.split('$d$')

  const id = pathString[pathString.length - 1]
  console.log(id)
  const { categories } = useContext(AppContext)
  const { data } = useQuery({
    queryKey: [path.product, id],
    queryFn: () => productApi.getPrdDetail(Number(id) || 1),
    staleTime: 60 * 1000 * 3
  })

  // form
  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      email: '',
      address: '',
      date: undefined,
      name: '',
      note: '',
      phone: '',
      isOneTime: 'oneTime'
    }
  })
  const mutationBooking = useMutation({
    mutationKey: mutationKeys.booking,
    mutationFn: (data: z.infer<typeof BookingSchema>) =>
      bookingApi.post({
        ...data,
        date: data.date.toISOString(),
        isOneTime: isEqual(data.isOneTime, isOneTime.oneTime) ? true : false
      }),
    onSuccess: () => {
      Toast.success({
        title: 'Thành công',
        description: 'Đặt dịch vụ thành công. Chúng tôi sẽ tư vấn trong thời gian sớm nhất.'
      })
    },
    onError: (error) => handleErrorAPI(error, form),
    onSettled: () => {
      setIsLoading(false)
    }
  })
  console.log(mutationBooking)

  const handleBooking = () => {
    setIsLoading(true)
    console.log(form.getValues())
    mutationBooking.mutate(form.getValues())
  }

  const product = data && data.data.data
  const category = categories?.find((item) => isEqual(item.id, product?.categoryID))
  const isSale = product && !isEqual(product?.discount, 0)

  return (
    <div className='md:pt-25 '>
      {product ? (
        <Fragment>
          <section className='bg-linear-to-br from-gray-100 to-slate-50 '>
            <div className='max-w-6xl mx-auto  py-10 flex items-center px-4'>
              <h1 className='text-head font-semibold md:mr-15 w-full md:w-1/2 lg:w-2/3 text-center md:text-left'>
                <span className='text-main font-bold text-justify'>Danh mục:</span> {category?.name}
              </h1>
              <div className='lg:w-1/3 md:w-1/2 md:block rounded-sm hidden'>
                <img src={category?.image} alt={category?.name} className='w-full h-auto object-cover' />
              </div>
            </div>
          </section>
          <SectionBgGreen>
            <div className=' flex items-center flex-col md:flex-row py-10'>
              <div className=' lg:w-1/3 md:w-1/2 md:block rounded-sm w-full'>
                <img src={product.image} alt={category?.name} className='w-full h-auto object-cover' />
              </div>
              <div className=' md:ml-15 w-full md:w-1/2 grow mt-4'>
                <h2 className='text-head font-semibold self-center  text-center md:text-left'>
                  {product?.name} Dịch vụ phun sơn khử khuẩn cho y tế
                </h2>
                <p className='text-gray text-base text-justify'>{product?.description}</p>
              </div>
            </div>
          </SectionBgGreen>

          <SectionBgWhite className='my-10'>
            <h3 className='text-center text-head font-semibold mb-6'>Chúng tôi làm những gì</h3>
            <SlideShow landingImages={product?.landingImages} />
          </SectionBgWhite>

          <SectionBgGreen className='p-4 min-h-[300px] md:min-h-[600px] relative mt-8 w-7xl'>
            <h3 className='w-full text-center text-head font-semibold mb-2'>Gói dịch vụ của chúng tôi</h3>
            <div className='grid h-full grid-cols-12 gap-4  '>
              <div className=' md:col-span-8 col-span-12 z-20 '>
                <SecctionInView className='flex flex-col items-center justify-center gap-8 h-full py-8'>
                  {isSale ? (
                    <div className='flex flex-col items-center py-30 border-2 border-dashed rounded-lg border-gray px-10 '>
                      <span className='text-red-600 font-semibold px-4 py-2 rounded-3xl bg-orange-300 flex justify-center items-center'>
                        <FlameIcon />
                        Giảm giá {product?.discount}%
                      </span>
                      <p className='text-head text-gray font-bold line-through'>{formatCurrentcy(product?.price)}VND</p>
                      <p className='text-head text-main font-bold'>{formatCurrentcy(product?.priceAfterDiscount)}VND</p>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center py-30 border-2 border-dashed rounded-lg border-gray px-10'>
                      <p className='text-head text-gray  font-bold'>
                        {formatCurrentcy(product?.priceAfterDiscount as number)}VND
                      </p>
                    </div>
                  )}
                </SecctionInView>
              </div>
            </div>
            <div
              className='absolute inset-0 bg-no-repeat bg-contain bg-right-bottom z-10 hidden md:block'
              style={{ backgroundImage: `url(${pic13})` }}
            ></div>
          </SectionBgGreen>

          <SectionBgWhite>
            <h2 className='text-head font-semibold text-center py-10'>Nhận xét và đánh giá</h2>
            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-12 md:col-span-4 flex flex-col items-center md:py-10'>
                <RatingStars
                  activeClassname='h-8 w-8 fill-yellow-300 text-yellow-300'
                  nonActiveClassname='h-8 w-8 fill-current text-gray-300'
                  rating={product.ratingStar}
                />
                <div className='text-head font-bold mb-2'>{product.ratingStar}</div>
                <p className='text-lg text-gray'>{product.reviewDTOs.length} lượt đánh giá</p>
              </div>
              <div className='col-span-12 md:col-span-8 md:pb-5'>
                {product.reviewDTOs.length > 0 ? (
                  <Comment reviews={product.reviewDTOs} />
                ) : (
                  <h3 className='text-head font-semibold text-center py-5 px-8'>Dịch vụ này chưa có đánh giá</h3>
                  // fake data
                  // <Comment />
                )}
              </div>
            </div>
          </SectionBgWhite>
          <SectionBgGreen>
            <h2 className='text-head font-semibold text-center py-10'>Đặt dịch vụ</h2>
            <div className='grid grid-cols-12 gap-4'>
              <div className='order-2 md:order-0 col-span-12 md:col-span-6 flex justify-end'>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleBooking)}
                    className='w-full md:w-[90%]  space-y-2 px-4 mb-10'
                    noValidate
                  >
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
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
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete='off'
                              placeholder='Nhập họ và tên'
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
                        name='date'
                        render={({ field }) => (
                          <FormItem className='basis-1/2'>
                            <FormLabel>Thời gian</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={'secondary'}
                                    className={cn(
                                      'w-full text-left justify-start mt-1 h-10 relative',
                                      !field.value && 'text-muted-foreground'
                                    )}
                                  >
                                    {/* {field.value ? format(field.value, 'PPP') : <span>Chọn thời gian</span>} */}
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
                              icon={<IconNonEye />}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='isOneTime'
                      render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                          <FormLabel>Loại dịch vụ bạn chọn:</FormLabel>

                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex'>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value={isOneTime.oneTime} />
                                </FormControl>
                                <FormLabel className='font-normal'>Một lần</FormLabel>
                              </FormItem>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value={isOneTime.month} />
                                </FormControl>
                                <FormLabel className='font-normal'>Định kỳ</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='note'
                      render={({ field }) => (
                        <FormItem className='mb-4'>
                          <FormLabel>Ghi chú</FormLabel>
                          <FormControl>
                            <textarea
                              className='block w-full h-20 mt-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:ring-primary focus:ring-2 placeholder:text-slate-500 outline-none pr-10'
                              id='note'
                              {...field}
                            ></textarea>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      loading={isLoading}
                      className='w-full text-lg cursor-pointer text-white h-12 bg-main py-3 hover:bg-main/80 duration-300 hover:shadow-lg '
                      type='submit'
                    >
                      Đặt Dịch Vụ
                    </Button>
                  </form>
                </Form>
              </div>
              <div className='order-1 col-span-12 md:col-span-6 h-full flex justify-start'>
                <p className='text-base md:text-xl text-justify md:pb-10 pb-5 px-5 md:pr-20 '>
                  <span className='text-main mr-2 font-semibold'>Domicare Company</span>Công ty chúng tôi chuyên cung
                  cấp các dịch vụ vệ sinh công nghiệp, dân dụng và khử khuẩn với đội ngũ nhân viên giàu kinh nghiệm,
                  trang thiết bị hiện đại và quy trình chuyên nghiệp
                </p>
              </div>
            </div>
          </SectionBgGreen>

          <SectionBgWhite>
            <h2 className='text-head font-semibold text-center py-10 '>Tìm hiểu thêm các dịch vụ khác của chúng tôi</h2>
            <div className='grid grid-cols-12  gap-4'>
              {category?.products.map((prd) => {
                return (
                  <div key={prd.id} className='col-span-6 mo:col-span-4 lg:col-span-3'>
                    <Product product={prd} />
                  </div>
                )
              })}
            </div>
          </SectionBgWhite>
        </Fragment>
      ) : (
        <div className=''> nobody</div>
      )}
    </div>
  )
}

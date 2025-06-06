import { useBookingQueryConfig } from '@/hooks/useBookingQueryConfig'
import SectionUser from '../../Layouts/SectionUser'
import { useContext } from 'react'
import { AppContext } from '@/core/contexts/app.context'
import { useUserBookingQuery } from '@/core/queries/product.query'
import StatusList from './StatusList'
import PaginationPage from '@/components/PaginationPage'
import { path } from '@/core/constants/path'
import { noPrdImg } from '@/assets/images'
import { formatCurrentcy } from '@/utils/formatCurrentcy'
import { statusLabels } from '@/configs/consts'
import { BookingStatus } from '@/models/interface/booking.interface'
import Manage from './Manage'

export default function History() {
  const { profile } = useContext(AppContext)
  const queryString = useBookingQueryConfig({ userId: profile?.id })

  const { data } = useUserBookingQuery({ queryString })
  const bookingList = data?.data?.data.data
  const pageController = data?.data?.data.meta

  return (
    <SectionUser title='Lịch sử dịch vụ' description='Xem lịch sử dịch vụ và trạng thái các dịch vụ tài khoản của bạn.'>
      <div className='md:mx-2 pb-5 pt-1 overflow-hidden'>
        <StatusList queryString={queryString} />
        <div className='mt-4 md:mt-10 rounded-xs py-3  bg-white '>
          {bookingList && bookingList.length > 0 ? (
            bookingList.map((item) => {
              return (
                <div key={item.id} className='my-2 p-4 bg-white max-w-7xl mx-auto border-b border-gray-200'>
                  <div className='grid grid-cols-12 '>
                    <div className='col-span-12 mo:col-span-9 flex items-center justify-start gap-4'>
                      <div className=' grow flex justify-start items-center gap-4 '>
                        <div className='flex justify-center items-center shrink-0 h-20 w-20 shadow overflow-hidden'>
                          <img
                            className='object-cover w-full h-full'
                            src={item.products?.[0].image}
                            alt={item.products?.[0].name}
                          />
                        </div>
                        <div className=''>
                          <p className='text-sm text-black line-clamp-2'>{item.products?.[0].name}</p>
                          <div className='flex justify-start items-center  cursor-default gap-1'>
                            <span className='text-gray text-sm line-through'>
                              đ{formatCurrentcy(item.products?.[0].price)}
                            </span>
                            <span className='text-black text-sm '>đ{formatCurrentcy(item.totalPrice)}</span>
                          </div>
                          <p className='text-sm text-black line-clamp-2'>
                            Loại dịch vụ: {item.isPeriodic ? 'Định kỳ' : 'Một lần'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-12 mo:col-span-3 flex justify-end items-center'>
                      <div className=' mt-2 mo:mt-0 w-full'>
                        <div className='text-base text-right uppercase text-mainStrong'>
                          {statusLabels[(item?.bookingStatus as keyof typeof statusLabels) || BookingStatus.PENDING]}
                        </div>
                        <div className='flex justify-end mo:col-span-2 cursor-default gap-1 items-end'>
                          <p className='text-gray'>Thành tiền:</p>
                          <p className='text-mainStrong text-2xl line-clamp-1'>đ{formatCurrentcy(item.totalPrice)}</p>
                        </div>
                        <Manage queryString={queryString} booking={item} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='flex flex-col justify-center items-center pt-5'>
              <img className='w-auto h-32' src={noPrdImg} alt='no_product' />
              <p className='text-black text-center py-4'>Danh mục trống</p>
            </div>
          )}
          <PaginationPage
            path={path.user.history}
            queryString={queryString}
            pageSize={pageController?.totalPages || 1}
            currentPage={pageController?.page || 1}
          />
        </div>
      </div>
    </SectionUser>
  )
}

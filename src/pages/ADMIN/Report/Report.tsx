// export interface IAppProps {}

import { path } from '@/core/constants/path'
import DataTable from '@/components/DataTable'
import { DataTablePagination } from '@/components/DataTable/DataTablePagination'
import { Skeleton } from '@/components/ui/skeleton'
import { BookingDialog } from './components/BookingDialog'

import { useBookingColumns } from './components/BookingColumns'
import { useBookingQueryConfig } from '@/hooks/useBookingQueryConfig'
import { BookingProvider } from '@/core/contexts/booking.context'
import { useBookingQuery } from '@/core/queries/product.query'
import { BookingButtonAction } from './components/BookingButtonAction'
import { useBookingWebSocket } from '@/hooks/useBookingWebSocket'

export default function Report() {
  return (
    <BookingProvider>
      <ReportContent />
    </BookingProvider>
  )
}

function ReportContent() {
  const queryString = useBookingQueryConfig({})
  const { data: bookingsData, isLoading } = useBookingQuery({ queryString })
  const bookingList = bookingsData?.data?.data.data
  const pageController = bookingsData?.data?.data.meta
  const columns = useBookingColumns()

  // realtime webSocket
  const memoizedQueryKey = [path.admin.report, queryString]
  useBookingWebSocket({ queryKey: memoizedQueryKey })

  return (
    <>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
        {isLoading ? (
          <div className='w-full overflow-x-auto'>
            <div className='flex justify-between items-center mb-4'>
              <Skeleton className='h-10 w-1/3' />
              <Skeleton className='h-10 w-24' />
            </div>
            <div className='w-full border rounded-md overflow-hidden'>
              <div className='grid grid-cols-8 gap-2 px-4 py-2 bg-gray-100 text-sm font-semibold'>
                {['ID', 'Khách hàng', 'Địa chỉ', 'Tổng tiền', 'Trạng thái', 'Dịch vụ', 'Thao tác'].map((text, idx) => (
                  <div key={idx} className='truncate'>
                    {text}
                  </div>
                ))}
              </div>
              {[...Array(10)].map((_, i) => (
                <div key={i} className='grid grid-cols-8 gap-2 px-4 py-3 border-t items-center'>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <Skeleton key={j} className='h-4 w-full' />
                  ))}
                </div>
              ))}
            </div>
            <div className='flex justify-between items-center mt-4'>
              <Skeleton className='h-8 w-24' />
              <Skeleton className='h-8 w-32' />
            </div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={bookingList || []}
            filterColumn='address'
            DataTablePagination={
              <DataTablePagination pageController={pageController} path={path.admin.report} queryString={queryString} />
            }
            ButtonAction={<BookingButtonAction />}
          />
        )}
      </div>
      <BookingDialog />
    </>
  )
}

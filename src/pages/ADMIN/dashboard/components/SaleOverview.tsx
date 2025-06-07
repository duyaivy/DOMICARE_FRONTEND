import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/core/helpers/date-time'
import { useOverviewQuery } from '@/core/queries/overview.query'
import { overviewApi } from '@/core/services/overview.service'
import { OverviewQueryConfig } from '@/hooks/useOverviewQueryConfig'
import { MiniSale } from '@/models/interface/user.interface'
import { formatCurrentcy } from '@/utils/formatCurrentcy'
import { Skeleton } from '@/components/ui/skeleton'
import { noPrdImg } from '@/assets/images'

interface SaleOverviewProps {
  queryString: OverviewQueryConfig
}

export function SaleOverview({ queryString }: SaleOverviewProps) {
  const queryFn = overviewApi.getTopSale
  const { data, isLoading } = useOverviewQuery<MiniSale[]>({ queryString, queryFn })
  const startDate = queryString?.startDate ? new Date(queryString?.startDate) : new Date()
  const endDate = queryString?.endDate ? new Date(queryString?.endDate) : new Date()

  return (
    <Card className='flex flex-col '>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-lg font-semibold capitalize'>Nhân viên ưu tú</CardTitle>
        <CardDescription>Danh sách những nhân viên xuất sắc có doanh thu cao</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0 px-5'>
        <div className='space-y-8'>
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((index) => (
                <div className='flex items-center' key={index}>
                  <Skeleton className='!size-8 rounded-full' />
                  <div className='ml-4 w-full space-y-2'>
                    <Skeleton className='h-5 w-full' />
                    <Skeleton className='h-5 w-1/2' />
                  </div>
                  <div className='ml-auto space-y-2 flex flex-col items-end w-full'>
                    <Skeleton className='h-4 w-1/3' />
                    <Skeleton className='h-4 w-1/4' />
                  </div>
                </div>
              ))}
            </>
          ) : data?.data.length === 0 ? (
            <div className='flex flex-col justify-center items-center pt-5'>
              <img className='w-auto h-32' src={noPrdImg} alt='no_product' />
              <p className='text-muted-foreground'>Chưa có dữ liệu về nhân viên ưu tú</p>
            </div>
          ) : (
            data?.data.map((sale) => (
              <div className='flex items-center' key={sale.id}>
                <Avatar className='size-9'>
                  <AvatarImage src={sale?.avatar} alt='Avatar' />
                  <AvatarFallback>{sale?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='ml-4 space-y-1'>
                  <p className='text-sm font-medium leading-none'>{sale.name}</p>
                  <p className='text-sm text-muted-foreground'>{sale.email}</p>
                </div>
                <div className='ml-auto font-medium'>
                  <p className='text-sm font-medium text-right'>{formatCurrentcy(sale?.totalSalePrice || 0)} VND</p>
                  <p className='text-sm text-muted-foreground text-right'>
                    Tỉ lệ: {sale?.totalSuccessBookingPercent ? Number(sale.totalSuccessBookingPercent).toFixed(2) : 0}%
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className='flex-col justify-start gap-2 text-sm'>
        {isLoading ? (
          <Skeleton className='h-4 w-full' />
        ) : (
          <div className='leading-none text-left text-muted-foreground w-full mt-3'>
            Dữ liệu doanh thu được tính toán từ {formatDate(startDate)} đến {formatDate(endDate)}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

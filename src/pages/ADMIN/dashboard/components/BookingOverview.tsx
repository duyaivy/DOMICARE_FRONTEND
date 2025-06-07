import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BookingOverview as BookingOverviewInterface } from '@/models/interface/dashboard.interface'
import { formatCurrentcy } from '@/utils/formatCurrentcy'
import { Skeleton } from '@/components/ui/skeleton'

interface BookingOverviewProps {
  value?: BookingOverviewInterface
  isLoading?: boolean
}

export function BookingOverview({ value, isLoading }: BookingOverviewProps) {
  const chartData = React.useMemo(
    () => [
      { status: 'Đang tư vấn', count: value?.totalAcceptedBookings, fill: '#42A5F5' },
      { status: 'Bị từ chối', count: value?.totalRejectedBookings, fill: '#F57C00' },
      { status: 'Thành công', count: value?.totalSuccessBookings, fill: '#2E7D32' },
      { status: 'Thất bại', count: value?.totalFailedBookings, fill: '#C62828' },
      { status: 'Chờ xác nhận', count: value?.totalPendingBookings, fill: '#FFA000' }
    ],
    [value]
  )

  const totalcount = React.useMemo(() => {
    return value?.totalBookings || 0
  }, [value])

  return (
    <Card className='flex flex-col h-full'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-lg font-semibold capitalize'>Biểu đồ đặt dịch vụ</CardTitle>
        <CardDescription>Mô tả dữ liệu đơn đặt hàng</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        {isLoading ? (
          <div className='w-auto h-[350px] mo:w-full mo:h-full flex justify-center items-center'>
            <Skeleton className='h-full aspect-square max-h-[500px] rounded-full' />
          </div>
        ) : (
          <ChartContainer config={{}} className='mx-auto aspect-square max-h-[500px]'>
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey='count' nameKey='status' innerRadius={100} strokeWidth={5}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                          <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
                            {totalcount.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground text-base'>
                            Tổng số đơn
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>

      <div className='flex justify-center gap-6 mt-4 px-4 flex-wrap'>
        {chartData.map((item) => (
          <div key={item.status} className='flex items-center gap-2'>
            <span className='inline-block w-4 h-4' style={{ backgroundColor: item.fill }} />
            <span className='text-sm'>{item.status}</span>
          </div>
        ))}
      </div>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none text-center'>
          Tổng doanh thu: {formatCurrentcy(value?.totalRevenueBookings)} VNĐ <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>Biểu đồ mô tả tỉ lệ đơn hàng từ </div>
      </CardFooter>
    </Card>
  )
}

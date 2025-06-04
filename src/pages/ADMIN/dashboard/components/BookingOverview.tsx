import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartData = [
  { status: 'Tư vấn thành công', count: 200, fill: '#42A5F5' }, // Blue - sáng hơn và chuyên nghiệp hơn
  { status: 'Bị từ chối', count: 800, fill: '#FFA726' }, // Orange - tông cam rõ ràng hơn
  { status: 'Thành công', count: 100, fill: '#66BB6A' }, // Green - dễ chịu hơn
  { status: 'Thất bại', count: 200, fill: '#EF5350' } // Red - nổi bật nhưng không quá gắt
]

const chartConfig = {
  count: {
    label: 'count'
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))'
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))'
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))'
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))'
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig
export function BookingOverview() {
  const totalcount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])
  return (
    <Card className='flex flex-col h-full'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-lg font-semibold capitalize'>Biểu đồ đặt dịch vụ</CardTitle>
        <CardDescription>Tháng 5 - 2025</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[500px]'>
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
      </CardContent>

      <div className='flex justify-center gap-6 mt-4 px-4'>
        {chartData.map((item) => (
          <div key={item.status} className='flex items-center gap-2'>
            <span className='inline-block w-4 h-4' style={{ backgroundColor: item.fill }} />
            <span className='text-sm'>{item.status}</span>
          </div>
        ))}
      </div>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none text-center'>
          Tỉ lệ tư vấn thành công tăng 5.2% trong tháng này <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>Biểu đồ mô tả tỉ lệ đơn hàng tháng gần nhất</div>
      </CardFooter>
    </Card>
  )
}

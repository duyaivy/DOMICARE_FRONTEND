import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
const chartData = [
  { browser: 'Tư vấn thành công ', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'Bị từ chối', visitors: 800, fill: 'var(--color-firefox)' },
  { browser: 'Thành công ', visitors: 100, fill: 'var(--color-edge)' },
  { browser: 'Thất bại ', visitors: 200, fill: 'var(--color-other)' }
]
const chartConfig = {
  visitors: {
    label: 'Visitors'
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
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
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
            <ChartLegend
              content={<ChartLegendContent nameKey='browser' />}
              className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey='visitors' nameKey='browser' innerRadius={100} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
                          {totalVisitors.toLocaleString()}
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
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none text-center'>
          Tỉ lệ tư vấn thành công tăng 5.2% trong tháng này <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>Biểu đồ mô tả tỉ lệ đơn hàng tháng gần nhất</div>
      </CardFooter>
    </Card>
  )
}

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartTooltipContent } from '@/components/ui/chart'
import { ChartContainer } from '@/components/ui/chart'
import { initialRevenueOverviewChart } from '@/core/constants/initialValue.const'
import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, Tooltip, YAxis } from 'recharts'

export function RevenueOverviewChart() {
  const chartConfig = {
    revenue: {
      label: 'Doanh thu ',
      color: '#02865a'
    }
  } satisfies ChartConfig
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold capitalize'>Biểu đồ doanh thu</CardTitle>
        <CardDescription>Tháng 5 - 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={initialRevenueOverviewChart}
            margin={{
              left: 0,
              right: 20
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={0} tickFormatter={(value) => value} />
            <YAxis />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Line dataKey='revenue' type='natural' stroke='var(--color-revenue)' strokeWidth={3} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Tăng trưởng đạt 5.2% trong tháng này <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Biểu đồ mô tả trực quan doanh thu của 12 tháng gần nhất
        </div>
      </CardFooter>
    </Card>
  )
}

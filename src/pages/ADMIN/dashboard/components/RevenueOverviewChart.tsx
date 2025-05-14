import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartTooltipContent } from '@/components/ui/chart'
import { ChartContainer } from '@/components/ui/chart'
import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, Tooltip, YAxis } from 'recharts'

const chartData = [
  { month: 'Th 1', revenue: 4000 },
  { month: 'Th 2', revenue: 3000 },
  { month: 'Th 3', revenue: 5000 },
  { month: 'Th 4', revenue: 4000 },
  { month: 'Th 5', revenue: 7000 },
  { month: 'Th 6', revenue: 6000 },
  { month: 'Th 7', revenue: 4000 },
  { month: 'Th 8', revenue: 4000 },
  { month: 'Th 9', revenue: 12000 },
  { month: 'Th 10', revenue: 9560 },
  { month: 'Th 11', revenue: 8000 },
  { month: 'Th 12', revenue: 6000 }
]

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
            data={chartData}
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

// import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// const data = [
//   { month: 'Jan', revenue: 4000 },
//   { month: 'Feb', revenue: 3000 },
//   { month: 'Mar', revenue: 5000 },
//   { month: 'Apr', revenue: 4000 },
//   { month: 'May', revenue: 7000 },
//   { month: 'Jun', revenue: 6000 },
//   { month: 'Jul', revenue: 8000 },
//   { month: 'Aug', revenue: 9000 },
//   { month: 'Sep', revenue: 8000 },
//   { month: 'Oct', revenue: 10000 },
//   { month: 'Nov', revenue: 11000 },
//   { month: 'Dec', revenue: 12000 }
// ]

// export function RevenueOverviewChart() {
//   return (
//     <div className=''>
//       <div className=' py-4'>
//         <p className='text-lg font-semibold'>Nhân viên ưu tú</p>
//         <p className='text-sm text-gray '>Dữ liệu doanh thu được tính toán từ quý gần nhất</p>
//       </div>
//       <ResponsiveContainer width='100%' height={500}>
//         <BarChart data={data}>
//           <XAxis dataKey='month' stroke='#02cf96' fontSize={12} tickLine={false} axisLine={false} />
//           <YAxis
//             stroke='#02cf96'
//             fontSize={12}
//             tickLine={false}
//             axisLine={false}
//             tickFormatter={(value) => `$${value}`}
//           />
//           <Bar dataKey='revenue' fill='#02cf96' radius={[4, 4, 0, 0]} />
//           <Tooltip />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

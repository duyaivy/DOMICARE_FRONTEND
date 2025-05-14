import { Activity, ArrowDownIcon, ArrowUpIcon, DollarSign, ShoppingCart, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const metrics = [
  {
    title: 'Doanh Thu',
    value: '$45,231.89',
    change: '+20.1%',
    icon: DollarSign
  },
  {
    title: 'Đơn Đặt Hàng',
    value: '2,350',
    change: '+15.1%',
    icon: ShoppingCart
  },
  {
    title: 'Khách Hàng Mới',
    value: '+573',
    change: '+201 từ tháng trước',
    icon: Users
  },
  {
    title: 'Lượt Đánh Giá',
    value: '4.67',
    change: '-5.4% so với tháng trước',
    icon: Activity
  }
]

export function MetricsOverview() {
  return (
    <div className='grid grid-cols-12 gap-2 '>
      {metrics.map((metric, index) => (
        <Card className='col-span-6 md:col-span-6 lg:col-span-3 p-2.5 md:py-6' key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-lg font-semibold capitalize '>{metric.title}</CardTitle>
            <metric.icon className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent className='px-2.5 md:px-6 truncate'>
            <div className='text-2xl font-bold'>{metric.value}</div>
            <p className='text-sm text-muted-foreground'>
              <span className={metric.change.startsWith('+') ? 'text-green-700' : 'text-red-500'}>
                {metric.change.startsWith('+') ? (
                  <ArrowUpIcon className='inline size-4' />
                ) : (
                  <ArrowDownIcon className='inline size-4' />
                )}
                {metric.change}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

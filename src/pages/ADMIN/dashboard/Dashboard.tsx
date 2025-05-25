import DateRangePicker from '@/components/DateRangePicker'
import { MetricsOverview } from './components/MetricsOverview'
import { SaleOverview } from './components/SaleOverview'
import { RevenueOverviewChart } from './components/RevenueOverviewChart'
import { BookingOverview } from './components/BookingOverview'

export default function Dashboard() {
  return (
    <div className='w-full mb-20'>
      <div className='flex justify-end'>
        <DateRangePicker />
      </div>
      <div className='pt-3'>
        <MetricsOverview />
        <div className='grid grid-cols-12 gap-5 mt-5'>
          <div className='col-span-12 mo:col-span-7'>
            <RevenueOverviewChart />
          </div>
          <div className='col-span-12 mo:col-span-5'>
            <BookingOverview />
          </div>
          <div className='col-span-12'>
            <SaleOverview />
          </div>
        </div>
      </div>
    </div>
  )
}

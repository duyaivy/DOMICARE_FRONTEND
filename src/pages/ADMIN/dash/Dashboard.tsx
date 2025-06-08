import DateRangePicker from '@/components/DateRangePicker'
import { useOverviewQueryConfig } from '@/hooks/useOverviewQueryConfig'
import { useOverviewQuery } from '@/core/queries/overview.query'
import { overviewApi } from '@/core/services/overview.service'
import { BookingOverview as BookingOverviewProps, DashboardData } from '@/models/interface/dashboard.interface'
import { MetricsOverview } from './components/MetricsOverview'
import { RevenueOverviewChart } from './components/RevenueOverviewChart'
import { BookingOverview } from './components/BookingOverview'
import { SaleOverview } from './components/SaleOverview'

export default function Dashboard() {
  const queryString = useOverviewQueryConfig()
  const queryFn = overviewApi.getSummary
  const { data, isLoading } = useOverviewQuery<DashboardData>({ queryString, queryFn })
  const summary = data?.data?.dashboardSummary
  const bookingOver = data?.data?.bookingOverview as BookingOverviewProps
  return (
    <div className='w-full mb-20'>
      <div className='flex justify-end'>
        <DateRangePicker queryString={queryString} />
      </div>
      <div className='pt-3'>
        <MetricsOverview value={summary} isLoading={isLoading} />
        <div className='grid grid-cols-12 gap-5 mt-5'>
          <div className='col-span-12 mo:col-span-7'>
            <RevenueOverviewChart />
          </div>
          <div className='col-span-12 mo:col-span-5'>
            <BookingOverview value={bookingOver} isLoading={isLoading} />
          </div>
          <div className='col-span-12'>
            <SaleOverview queryString={queryString} />
          </div>
        </div>
      </div>
    </div>
  )
}

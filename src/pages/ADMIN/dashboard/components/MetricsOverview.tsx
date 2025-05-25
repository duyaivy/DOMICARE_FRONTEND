import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { initialMetricsOverview } from '@/core/constants/initialValue.const'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
export function MetricsOverview() {
  return (
    <div className='grid grid-cols-12 gap-2 '>
      {initialMetricsOverview.map((metric, index) => (
        <Card className='col-span-6 md:col-span-6 lg:col-span-3 p-2.5 md:py-6' key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-lg font-semibold capitalize '>{metric.title}</CardTitle>
            <metric.icon className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent className='px-2.5 md:px-6 truncate'>
            {/* <div className='text-2xl font-bold '>
            {metric.value}
            </div> */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className='text-2xl font-bold'
            >
              <CountUp
                end={Number(metric.value || 0)}
                start={0}
                prefix={Number(metric.value) > 0 ? '+' : ''}
                duration={1.5}
              />
            </motion.div>
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

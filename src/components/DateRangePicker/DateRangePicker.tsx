import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HTMLAttributes, useState } from 'react'
import { cn } from '@/core/lib/utils'
import { STANDARD_DATE_FORMAT_INVERSE } from '@/configs/consts'
import dayjs from 'dayjs'
import { formatDateTime } from '@/core/helpers/date-time'

const initialDateRange: DateRange = {
  to: new Date(),
  from: addDays(new Date(), -30)
}
export function DateRangePicker({ className }: HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange)
  const handleChangeDate = (range: DateRange) => {
    setDate(range)
    console.log('call API')
  }
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'px-2.5 md:px-6 justify-start text-left font-normal border-gray-200',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDateTime(dayjs(date.from), STANDARD_DATE_FORMAT_INVERSE)} -{' '}
                  {formatDateTime(dayjs(date.to), STANDARD_DATE_FORMAT_INVERSE)}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => handleChangeDate(range as DateRange)}
            numberOfMonths={2}
            formatters={{
              formatCaption: (date) => format(date, 'MM - yyyy')
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

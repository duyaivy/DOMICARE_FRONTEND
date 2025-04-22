import classNames from 'classnames'
import { range } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'

interface DateSelectProps {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateTimeSelect({ onChange, value, errorMessage }: DateSelectProps) {
  const [date, setDate] = useState<{ day: number; month: number; year: number }>({
    day: 1,
    month: 0,
    year: 2000
  })

  useEffect(() => {
    if (value) {
      setDate({ day: value.getDate(), month: value?.getMonth(), year: value?.getFullYear() })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //  lay gia tri cua event
    const { value, name } = event.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate) // set date moi
    onChange?.(new Date(newDate.year, newDate.month, newDate.day))
  }
  return (
    <Fragment>
      <div className='flex flex-nowrap mt-1 mb-0'>
        <div className='flex w-full justify-between items-center flex-wrap'>
          <select
            onChange={handleChange}
            name='day'
            value={value?.getDate() || date.day}
            className={classNames(
              'w-[33%] border text-sm focus:outline-none rounded-md text-black h-10 mo:p-2 border-[#e2e2e2]  hover:border-main cursor-pointer',
              { 'border-red-500 text-red-500': errorMessage }
            )}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item, index) => (
              <option className='text-center' value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='month'
            onChange={handleChange}
            value={value?.getMonth() || date.month}
            className={classNames(
              'w-[30%] border text-sm focus:outline-none rounded-md text-black h-10 mo:p-2 border-[#e2e2e2]  hover:border-main cursor-pointer',
              { 'border-red-500 text-red-500': errorMessage }
            )}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item, index) => (
              <option value={item} key={index} className='text-center'>
                Tháng {item + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
            className={classNames(
              'w-[30%] border text-sm focus:outline-none rounded-md text-black h-10 mo:p-2 border-[#e2e2e2]  hover:border-main cursor-pointer',
              { 'border-red-500 text-red-500': errorMessage }
            )}
          >
            <option disabled>Năm</option>
            {range(1910, 2025).map((item, index) => (
              <option value={item} key={index} className='text-center'>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className=' w-full text-red-500 text-sm'>{errorMessage}</div>
    </Fragment>
  )
}

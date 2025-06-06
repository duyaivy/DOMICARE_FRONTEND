import { isUndefined, omitBy } from 'lodash'
import { useParamsString } from './usePrdQueryConfig'
import { BookingListConfig } from '@/models/interface/booking.interface'

export type BookingQueryConfig = {
  [key in keyof BookingListConfig]: string
}

export const useBookingQueryConfig = () => {
  const queryString: BookingQueryConfig = useParamsString()
  const queryConfig: BookingQueryConfig = omitBy(
    {
      page: queryString.page || '1',
      size: queryString.size || '10',
      sortBy: queryString.sortBy,
      sortDirection: queryString.sortDirection,
      userId: queryString.userId,
      searchName: queryString.searchName,
      bookingStatus: queryString.bookingStatus,
      saleId: queryString.saleId
    },
    isUndefined
  )

  return queryConfig
}

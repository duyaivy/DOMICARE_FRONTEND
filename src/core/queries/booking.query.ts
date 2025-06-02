import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { handleToastError } from '@/utils/handleErrorAPI'
import { bookingApi } from '../services/booking.service'
import { BookingQueryConfig } from '@/hooks/useBookingQueryConfig'
import { BookingListConfig } from '@/models/interface/booking.interface'
import { path } from '../constants/path'
export const useBookingQuery = ({ queryString }: { queryString: BookingQueryConfig }) => {
  return useQuery({
    queryKey: [path.admin.report, queryString],
    queryFn: () => bookingApi.query(queryString as BookingListConfig)
  })
}

export const useBookingDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => bookingApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [path.admin.report] })
    },
    onError: (error) => {
      handleToastError(error)
    }
  })
}

export const useBookingUpdate = (options?: any) => {
  const queryClient = useQueryClient()
  return useMutation({
    // mutationFn: (data: any) => bookingApi.(data.id, data),
    mutationFn: (data: any) => {
      console.log(data)
      return Promise.resolve()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: (error) => handleToastError({ error }),
    ...options
  })
}

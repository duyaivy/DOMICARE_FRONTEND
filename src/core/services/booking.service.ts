import axiosClient from '@/core/services/axios-client'
import { BookingRequest } from '@/models/interface/booking.interface'
import { SuccessResponse } from '@/models/interface/response.interface'

const API_BOOKING_URL = '/api/bookings'

export const bookingApi = {
  post: (params: BookingRequest) => {
    return axiosClient.post<SuccessResponse<null>>(API_BOOKING_URL, params)
  },
  postUnlogin: (params: BookingRequest) => {
    return axiosClient.post<SuccessResponse<null>>(API_BOOKING_URL, params, {
      headers: {
        Authorization: null
      }
    })
  }
}

import axiosClient from '@/core/services/axios-client'
import {
  BookingListConfig,
  BookingRequest,
  BookingResponse,
  BookingUpdateRequest
} from '@/models/interface/booking.interface'
import { SuccessResponse } from '@/models/interface/response.interface'

const API_BOOKING_URL = '/api/bookings'
const API_BOOKING_STATUS_URL = '/api/bookings/status'
export const bookingApi = {
  post: (params: BookingRequest, isLogin?: boolean) => {
    const headers = !isLogin
      ? {
          Authorization: null
        }
      : {}

    return axiosClient.post<SuccessResponse<null>>(API_BOOKING_URL, params, { headers })
  },
  query: (params: BookingListConfig) => {
    return axiosClient.get<SuccessResponse<BookingResponse>>(API_BOOKING_URL, { params })
  },
  get: () => {
    return axiosClient.get<SuccessResponse<BookingResponse>>(API_BOOKING_URL)
  },
  getById: (id: number) => {
    return axiosClient.get<SuccessResponse<BookingResponse>>(`${API_BOOKING_URL}/${id}`)
  },
  delete: (id: number) => {
    return axiosClient.delete<SuccessResponse<null>>(`${API_BOOKING_URL}/${id}`)
  },
  edit: (data: BookingUpdateRequest) => {
    return axiosClient.put<SuccessResponse<BookingResponse>>(API_BOOKING_URL, data)
  },
  updateStatus: (data: BookingUpdateRequest) => {
    return axiosClient.put<SuccessResponse<BookingResponse>>(API_BOOKING_STATUS_URL, data)
  }
}

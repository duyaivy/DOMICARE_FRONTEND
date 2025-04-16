import axiosClient from '@/core/services/axios-client'
import { SuccessResponse } from '@/models/interface/response.interface'
import { BookingType } from '@/models/types/booking.type'

const API_BOOKING_URL = '/login'

export const bookingApi = {
  post: (params: BookingType) => {
    return axiosClient.post<SuccessResponse<null>>(API_BOOKING_URL, params)
  }
  // register: (params: Omit<RegisterType, 'confirm_password'>) => {
  //   return axiosClient.post<SuccessResponse<RegisterReponse>>(API_REGISTER_URL, params)
  // },
  // sentEmailAuth: (params: { email: string }) => {
  //   return axiosClient.get<SuccessResponse<SentEmailResponse>>(API_SENT_EMAIL_URL, {
  //     params
  //   })
  // },
  // logout: (parasm: { refreshToken: string }) => {
  //   return axiosClient.post<SuccessResponse<null>>(API_LOGOUT_URL, { parasm })
  // }
}

import axiosClient from '@/core/services/axios-client'
import { LoginResponse, RegisterReponse, SentEmailResponse } from '@/models/interface/auth.interface'
import { SuccessResponse } from '@/models/interface/response.interface'
import { LoginType } from '@/models/types/login.type'
import { RegisterType } from '@/models/types/register.type'

const API_LOGIN_URL = '/login'
const API_LOGOUT_URL = '/logout'
const API_REGISTER_URL = '/register'
const API_SENT_EMAIL_URL = '/email/verify'

export const authApi = {
  login: (params: LoginType) => {
    return axiosClient.post<SuccessResponse<LoginResponse>>(API_LOGIN_URL, params)
  },
  register: (params: Omit<RegisterType, 'confirm_password'>) => {
    return axiosClient.post<SuccessResponse<RegisterReponse>>(API_REGISTER_URL, params)
  },
  sentEmailAuth: (params: { email: string }) => {
    return axiosClient.get<SuccessResponse<SentEmailResponse>>(API_SENT_EMAIL_URL, {
      params
    })
  },
  logout: (parasm: { refreshToken: string }) => {
    return axiosClient.post<SuccessResponse<null>>(API_LOGOUT_URL, { parasm })
  }
}

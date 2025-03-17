import axiosClient from '@/core/services/axios-client'
import { LoginResponse, RegisterReponse } from '@/models/interface/auth.interface'
import { SuccessResponse } from '@/models/interface/response.interface'
import { loginType } from '@/models/types/login.type'
import { registerType } from '@/models/types/register.type'

const API_LOGIN_URL = '/login'
const API_REGISTER_URL = '/register'

export const authApi = {
  login: (params: loginType) => {
    return axiosClient.post<SuccessResponse<LoginResponse>>(API_LOGIN_URL, params)
  },
  register: (params: Omit<registerType, 'confirm_password'>) => {
    return axiosClient.post<SuccessResponse<RegisterReponse>>(API_REGISTER_URL, params)
  }
}

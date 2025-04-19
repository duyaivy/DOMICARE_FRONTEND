import axiosClient from './axios-client'
import { SuccessResponse } from '@/models/interface/response.interface'
import { User, UserListConfig, UserResponse, UserUpdateAPI } from '@/models/interface/user.interface'

const API_USER_URL = '/users'

export const userApi = {
  get: (params: UserListConfig) => {
    return axiosClient.get<SuccessResponse<UserResponse>>(API_USER_URL, { params })
  },
  delete: (id: number) => {
    return axiosClient.delete<SuccessResponse<null>>(`${API_USER_URL}/${id}`)
  },
  update: (user: UserUpdateAPI) => {
    return axiosClient.put<SuccessResponse<User>>(API_USER_URL, user)
  },
  getById: (id: number) => {
    return axiosClient.get<SuccessResponse<User>>(`${API_USER_URL}/${id}`)
  }
}

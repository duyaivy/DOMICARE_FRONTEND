import { ROLE_SALE } from '@/configs/consts'
import axiosClient from './axios-client'
import { SuccessResponse } from '@/models/interface/response.interface'
import {
  roleAddRequest,
  User,
  UserListConfig,
  UserResponse,
  UserUpdateRequest
} from '@/models/interface/user.interface'
import { ROLE_TYPE } from '@/models/types/user.type'
import { isEqual } from 'lodash'

const API_USER_URL = '/users'
const API_SALE_URL = '/users/sales'
const API_CUSTOMER_URL = '/users/customers'
export const userApi = {
  get: (params: UserListConfig, role?: ROLE_TYPE) => {
    return axiosClient.get<SuccessResponse<UserResponse>>(isEqual(role, ROLE_SALE) ? API_SALE_URL : API_CUSTOMER_URL, {
      params
    })
  },
  getAll: (params: UserListConfig) => {
    return axiosClient.get<SuccessResponse<UserResponse>>(API_USER_URL, { params })
  },
  delete: (id: number) => {
    return axiosClient.delete<SuccessResponse<null>>(`${API_USER_URL}/${id}`)
  },
  update: (user: UserUpdateRequest) => {
    return axiosClient.put<SuccessResponse<User>>(API_USER_URL, user)
  },
  getById: (id: number) => {
    return axiosClient.get<SuccessResponse<User>>(`${API_USER_URL}/${id}`)
  },
  addRole: (params: roleAddRequest) => {
    return axiosClient.put<SuccessResponse<any>>(`${API_USER_URL}/roles`, params)
  }
}

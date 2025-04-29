import axiosClient from './axios-client'
import { SuccessResponse } from '@/models/interface/response.interface'
import { Category, CategoryListConfig, CategoryRequest, CategoryResponse } from '@/models/interface/category.interface'

const API_CATEGORY_URL = '/api/categories'
const API_CATEGORY_PUBLIC_URL = '/api/public/categories'

export const categoryApi = {
  query: (params: CategoryListConfig) => {
    return axiosClient.get<SuccessResponse<CategoryResponse>>(API_CATEGORY_PUBLIC_URL, { params })
  },
  get: () => {
    return axiosClient.get<SuccessResponse<CategoryResponse>>(API_CATEGORY_PUBLIC_URL)
  },
  getById: (id: number) => {
    return axiosClient.get<SuccessResponse<CategoryResponse>>(`${API_CATEGORY_PUBLIC_URL}/${id}`)
  },
  delete: (id: number) => {
    return axiosClient.delete<SuccessResponse<null>>(`${API_CATEGORY_URL}/${id}`)
  },
  add: (data: CategoryRequest) => {
    return axiosClient.post<SuccessResponse<Category>>(API_CATEGORY_URL, data)
  },
  edit: (data: CategoryRequest) => {
    return axiosClient.put<SuccessResponse<Category>>(API_CATEGORY_URL, data)
  }
}

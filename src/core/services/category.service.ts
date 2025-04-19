import axiosClient from './axios-client'
import { SuccessResponse } from '@/models/interface/response.interface'
import { Category, CategoryListConfig, CategoryResponse } from '@/models/interface/category.interface'

const API_CATEGORY_URL = '/api/categories'
const API_CATEGORY_PUBLIC_URL = '/api/public/categories'

export const categoryApi = {
  query: (params: CategoryListConfig) => {
    return axiosClient.get<SuccessResponse<CategoryResponse>>(API_CATEGORY_PUBLIC_URL, { params })
  },
  get: () => {
    return axiosClient.get<SuccessResponse<CategoryResponse>>(API_CATEGORY_PUBLIC_URL)
  },
  delete: (id: number) => {
    return axiosClient.delete<SuccessResponse<null>>(`${API_CATEGORY_URL}/${id}`)
  },
  add: (cate: Category) => {
    return axiosClient.post<SuccessResponse<Category>>(API_CATEGORY_URL, cate)
  },
  update: (cate: Category) => {
    return axiosClient.put<SuccessResponse<Category>>(API_CATEGORY_URL, cate)
  }
}

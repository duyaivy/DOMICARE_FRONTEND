import { Product, ProductListConfig, ProductResponse } from '@/models/interface/product.interface'
import axiosClient from './axios-client'
import { SuccessResponse } from '@/models/interface/response.interface'

const API_PRODUCT_URL = '/api/products'

export const productApi = {
  get: (params: ProductListConfig) => {
    return axiosClient.get<SuccessResponse<ProductResponse>>(API_PRODUCT_URL, { params })
  },
  delete: (id: number) => {
    return axiosClient.delete<SuccessResponse<null>>(`${API_PRODUCT_URL}/${id}`)
  },
  create: (prd: Product) => {
    return axiosClient.post<SuccessResponse<Product>>(API_PRODUCT_URL, prd)
  },
  update: (prd: Product) => {
    return axiosClient.put<SuccessResponse<Product>>(API_PRODUCT_URL, prd)
  }
}

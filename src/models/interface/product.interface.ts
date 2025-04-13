import { Review } from './review.interface'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  ratingStar: number
  discount: number
  priceAfterDiscount: number
  landingImages: string[]
  categoryID: number
  reviewDTOs: Review[]
  createBy: string
  updateBy: string
  createAt: string
  updateAt: string
}
export interface ProductResponse {
  meta: {
    page: number
    size: number
    total: number
    totalPages: number
  }
  data: Product[]
}

export interface ProductListConfig {
  page?: number
  size?: number
  sortBy?: 'price' | 'name' | 'discount' | 'ratingStar'
  sortDirection?: 'desc' | 'asc'
  // isAcsending?: 'true' | 'false'
  filter?: string
  categoryid?: number
}

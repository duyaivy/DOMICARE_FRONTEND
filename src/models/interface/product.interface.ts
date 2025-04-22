import { Review } from './review.interface'

export interface Product {
  id?: number
  name?: string
  description?: string
  price?: number
  image?: string
  ratingStar?: number
  discount?: number
  priceAfterDiscount?: number
  landingImages?: string[]
  categoryID?: number
  reviewDTOs?: Review[]
  createBy?: string
  updateBy?: string
  createAt?: string
  updateAt?: string
}
export interface ProductResponse {
  meta: {
    page?: number
    size?: number
    total?: number
    totalPages?: number
  }
  data: Product[]
}

export interface ProductListConfig {
  page?: number
  size?: number
  sortBy?: 'price' | 'name' | 'discount' | 'overalRating'
  sortDirection?: 'desc' | 'asc'
  filter?: string
  categoryId?: number
  searchName?: string
}
export interface ProductUpdateRequest {
  oldProductId: number
  oldCategoryId: number
  updateProduct: {
    name?: string
    description?: string
    price?: number
    discount?: number
    categoryID?: number
    image?: string
    landingImages?: string[]
  }
}

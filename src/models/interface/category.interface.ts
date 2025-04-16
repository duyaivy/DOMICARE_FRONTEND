import { Product } from './product.interface'

export interface Category {
  id: number
  name?: string
  description?: string
  products?: Product[]
  image?: string
  createBy?: string
  updateBy?: string
  createAt?: string
  updateAt?: string
}

export interface CategoryResponse {
  meta: {
    page?: number
    size?: number
    total?: number
    totalPages?: number
  }
  data: Category[]
}

export interface CategoryListConfig {
  page?: number
  size?: number
  sortBy?: 'id' | 'price' | 'name' | 'overalRating'
  filter?: string
  sortDirection?: 'asc' | 'desc'
  searchName?: string
}

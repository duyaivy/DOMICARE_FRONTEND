import { Product } from './product.interface'

export interface Category {
  id: number
  name: string
  description: string
  products: Product[]
  image: string
  createBy: string | null
  updateBy: string | null
  createAt: string
  updateAt: string | null
}

export interface CategoryResponse {
  meta: {
    page: number
    size: number
    total: number
    totalPages: number
  }
  data: Category[]
}

export interface CategoryListConfig {
  page?: number
  size?: number
  sortBy?: 'id' | 'price' | 'name'
  filter?: string
  sortDirection?: 'asc' | 'desc'
  searchName?: string
}

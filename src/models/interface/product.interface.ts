export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  ratingStar: number
  discount: number
  categoryID: number
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
  sortByStar?: boolean // thiet ke lai
  isAcsending?: 'true' | 'false'
  filter?: string
  categoryid?: number
}

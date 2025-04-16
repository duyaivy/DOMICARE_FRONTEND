export interface Review {
  id: number
  rating: number
  comment: string
  createAt: string
  updateAt: string | null
  createBy: string
  updateBy: string | null
  userId: number
  productId: number
}

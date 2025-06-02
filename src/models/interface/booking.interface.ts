import { Product } from './product.interface'
import { PaginationResponse } from './response.interface'
import { User } from './user.interface'

export interface BookingRequest {
  address: string
  phone: string
  isPeriodic: boolean
  productIds: number[]
  startTime: string
  note?: string
  guestEmail?: string
}
export interface DataBookingAPI {
  dataAPI: BookingRequest
  isLogin: boolean
}
export enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  REJECTED = 'REJECTED'
}
export interface BookingListConfig {
  page?: number
  size?: number
  searchName?: string
  sortBy?: 'totalPrice' | 'startTime' | 'bookingStatus'
  sortDirection?: 'asc' | 'desc'
}
export interface BookingResponse {
  meta: PaginationResponse
  data: Booking[]
}
export interface Booking {
  id?: number
  address?: string
  totalPrice?: number
  note?: string
  startTime?: string
  products?: Product[]
  userDTO?: User
  isPeriodic?: boolean
  bookingStatus?: string
  createBy?: string
  updateBy?: string
  createAt?: string
  updateAt?: string
}

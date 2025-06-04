import { Product } from './product.interface'
import { PaginationResponse } from './response.interface'
import { User } from './user.interface'
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
interface BookingAPI {
  address: string
  phone: string
  isPeriodic: boolean
  startTime: string
  note?: string
  name?: string
}

export interface BookingRequest extends BookingAPI {
  productIds: number[]
  guestEmail?: string
}
export interface BookingUpdateRequest extends BookingAPI {
  status?: BookingStatus
  bookingId?: number
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
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
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

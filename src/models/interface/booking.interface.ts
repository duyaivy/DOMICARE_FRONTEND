export interface BookingRequest {
  address: string
  phone: string
  isPeriodic: boolean
  productIds: number[]
  date: string
  note?: string
  email?: string
}

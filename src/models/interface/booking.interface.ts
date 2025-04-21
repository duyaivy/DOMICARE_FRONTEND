export interface BookingRequest {
  address: string
  phone: string
  isPeriodic: boolean
  productIds: number[]
  startTime: string
  note?: string
  guestEmail?: string
}

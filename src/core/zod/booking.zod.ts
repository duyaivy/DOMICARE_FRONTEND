import { z } from 'zod'
import { numberConstants } from '@/configs/consts'

export const BookingSchema = z.object({
  email: z
    .string()
    .min(numberConstants.TWO, {
      message: 'Email không được để trống.'
    })
    .email({
      message: 'Email không đúng định dạng.'
    }),
  phone: z
    .string()
    .min(10, { message: 'Số điện thoại không được để trống hoặc không hợp lệ.' })
    .regex(/^\d+$/, { message: 'Số điện thoại chỉ được chứa số.' }),

  name: z.string().min(2, { message: 'Họ tên không được để trống.' }),

  address: z.string().min(5, { message: 'Địa chỉ không được để trống.' }),

  date: z.date({ message: 'Ngày không được để trống.' }),

  note: z.string().optional(), // cho phép để trống
  isOneTime: z.enum(['oneTime', 'month'])
})

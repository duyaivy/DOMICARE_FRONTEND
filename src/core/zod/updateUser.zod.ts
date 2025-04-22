import { z } from 'zod'
import { validator } from '../helpers/validator'
import { numberConstants } from '@/configs/consts'

export const UpdateUserSchema = z.object({
  name: z.string().min(numberConstants.TWO, {
    message: 'Họ tên không được để trống.'
  }),
  dateOfBirth: z.date({ message: 'Ngày sinh không được để trống.' }),
  phone: z
    .string()
    .min(numberConstants.TEN, { message: 'Số điện thoại không được để trống.' })
    .regex(validator.number, { message: 'Số điện thoại chỉ được chứa số.' }),
  imageId: z.number().optional(),
  address: z.string().min(numberConstants.FIVE, {
    message: 'Địa chỉ không được để trống.'
  }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'])
})

export const UpdatePassUserSchema = z
  .object({
    newPassword: z
      .string()
      .min(numberConstants.ONE, {
        message: 'Mật khẩu không được bỏ trống'
      })
      .regex(validator.passwordRegex, {
        message: 'Mật khẩu phải chứa ít nhất 6 kí tự bao gồm chữ in hoa in thường và chữ số.'
      }),
    confirmPassword: z
      .string()
      .min(numberConstants.ONE, {
        message: 'Nhập lại mật khẩu không được bỏ trống'
      })
      .regex(validator.passwordRegex, {
        message: 'Nhập lại mật khẩu phải chứa ít nhất 6 kí tự bao gồm chữ in hoa in thường và chữ số.'
      }),
    oldPassword: z.string().min(numberConstants.SIX, {
      message: 'Mật khẩu cũ phải có ít nhất 6 ký tự.'
    })
  })
  .refine(
    (data) => {
      // Nếu newPassword tồn tại thì phải có confirmPassword và phải khớp
      if (data.newPassword) {
        return data.newPassword === data.confirmPassword
      }
      return true
    },
    {
      message: 'Xác nhận mật khẩu không khớp.',
      path: ['confirmPassword']
    }
  )

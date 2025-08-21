import { numberConstants } from '@/configs/consts'
import { z } from 'zod'

export const ChatSchema = z.object({
  message: z.string().min(numberConstants.ZERO, {
    message: 'Tin nhắn không được để trống.'
  })
})

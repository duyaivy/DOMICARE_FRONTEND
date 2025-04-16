import { numberConstants } from '@/configs/consts'
import { z } from 'zod'

export const SearchChema = z.object({
  name: z.string().min(numberConstants.TWO)
})

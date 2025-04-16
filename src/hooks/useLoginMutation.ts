import { mutationKeys } from '@/core/helpers/key-tanstack'
import { authApi } from '@/core/services/auth.service'
import { LoginSchema } from '@/core/zod'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export const useMutationLogin = () =>
  useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: (data: z.infer<typeof LoginSchema>) => authApi.login(data)
  })

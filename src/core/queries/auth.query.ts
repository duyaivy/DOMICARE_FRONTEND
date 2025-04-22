import { mutationKeys } from '@/core/helpers/key-tanstack'
import { authApi } from '@/core/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { path } from '../constants/path'
import { handleErrorAPI } from '@/utils/handleErrorAPI'
import { Toast } from '@/utils/toastMessage'
import { setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '../shared/storage'
import { User } from '@/models/interface/user.interface'
import { useContext } from 'react'
import { AppContext } from '../contexts/app.context'
import { SuccessResponse } from '@/models/interface/response.interface'
import { LoginResponse } from '@/models/interface/auth.interface'
import { AxiosError, AxiosResponse } from 'axios'
import { RegisterSchema } from '../zod'
import { omit } from 'lodash'
import { z } from 'zod'

// login
interface useLoginProps<TVariables> {
  mutationFn: (data: TVariables) => Promise<AxiosResponse<SuccessResponse<LoginResponse>>>
  handleError?: (error: AxiosError) => void
}
export const useLoginMutation = <TVariables>({ mutationFn, handleError }: useLoginProps<TVariables>) => {
  const { setProfile, setIsAuthenticated } = useContext(AppContext)

  return useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: mutationFn,
    onSuccess: ({ data }) => {
      setAccessTokenToLS(data.data.accessToken as string)
      setRefreshTokenToLS(data.data.refreshToken as string)
      setUserToLS(data.data.user as User)
      setIsAuthenticated(true)
      setProfile(data.data.user as User)
      Toast.success({ title: 'Thành công', description: 'Đăng nhập thành công 🚀🚀⚡⚡' })
    },
    onError: handleError
  })
}

//re-sent email
export const useSentMailMutation = (form: UseFormReturn<any>) => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['sentEmail'],
    mutationFn: () => authApi.sentEmailAuth({ email: form.getValues('email') }),
    onSuccess: () => {
      Toast.success({
        title: 'Thành công vui lòng xác thực email.',
        description: `Email xác nhận đã được gửi tới ${form.getValues('email')}, vui lòng kiểm tra Spam hoặc Thư rác.`
      })
      navigate(path.login)
    },
    onError: (error) => handleErrorAPI(error, form)
  })
}

// register

export const useRegisterMutation = ({ handleError }: { handleError?: (error: AxiosError) => void }) => {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: mutationKeys.register,
    mutationFn: (data: z.infer<typeof RegisterSchema>) => authApi.register(omit(data, 'confirm_password')),
    onSuccess: () => {
      navigate(path.login)
      Toast.success({
        title: 'Thành công',
        description: 'Đăng kí tài khoản thành công. Vui lòng kiểm tra Mail của bạn.'
      })
    },
    onError: handleError
  })
}

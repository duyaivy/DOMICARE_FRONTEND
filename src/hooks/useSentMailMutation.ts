import { path } from '@/core/constants/path'
import { authApi } from '@/core/services/auth.service'
import { handleErrorAPI } from '@/utils/handleErrorAPI'
import { Toast } from '@/utils/toastMessage'
import { useMutation } from '@tanstack/react-query'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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

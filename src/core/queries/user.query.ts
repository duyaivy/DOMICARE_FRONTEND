import { AppContext } from '@/core/contexts/app.context'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import { userApi } from '@/core/services/user.service'
import { setUserToLS } from '@/core/shared/storage'
import { UserUpdateAPI } from '@/models/interface/user.interface'
import { handleToastError } from '@/utils/handleErrorAPI'
import { Toast } from '@/utils/toastMessage'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { fileApi } from '../services/file.service'

export const useUserMutation = () => {
  const { setProfile } = useContext(AppContext)
  return useMutation({
    mutationKey: [mutationKeys.updateProfile],
    mutationFn: (data: UserUpdateAPI) => userApi.update(data),

    onSuccess(data) {
      Toast.success({ description: data.data.message })
      const newUser = data.data.data
      setProfile(newUser)
      setUserToLS(newUser)
    },

    onError: (error) => handleToastError(error)
  })
}

export const useUploadFileMutation = () =>
  useMutation({
    mutationKey: mutationKeys.uploadFile,
    mutationFn: fileApi.post,
    onError: (error) => handleToastError(error),
    onSuccess: (data) => {
      Toast.success({ title: 'Thành công', description: data.data.message })
    }
  })

export const useUploadMutilFileMutation = () =>
  useMutation({
    mutationKey: mutationKeys.uploadFile,
    mutationFn: fileApi.postMultiple,
    onError: (error) => handleToastError(error),
    onSuccess: (data) => {
      Toast.success({ title: 'Thành công', description: data.data.message })
    }
  })

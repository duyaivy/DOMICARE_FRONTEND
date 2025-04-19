import { AppContext } from '@/core/contexts/app.context'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import { userApi } from '@/core/services/user.service'
import { setUserToLS } from '@/core/shared/storage'
import { UserUpdateAPI } from '@/models/interface/user.interface'
import { Toast } from '@/utils/toastMessage'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useContext } from 'react'
interface useUserProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>
}
export const useUserMutation = ({ setIsLoading }: useUserProps) => {
  const { setProfile } = useContext(AppContext)
  return useMutation({
    mutationKey: [mutationKeys.updateProfile],
    mutationFn: (data: UserUpdateAPI) => userApi.update(data),
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess(data) {
      Toast.success({ title: data.data.message })
      const newUser = data.data.data
      setProfile(newUser)
      setUserToLS(newUser)
    },
    onSettled: () => {
      setIsLoading(false)
    },
    onError(error) {
      Toast.error({ title: error.message })
    }
  })
}

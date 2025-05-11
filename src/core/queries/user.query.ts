import { mutationKeys } from '@/core/helpers/key-tanstack'
import { userApi } from '@/core/services/user.service'
import { handleToastError } from '@/utils/handleErrorAPI'
import { Toast } from '@/utils/toastMessage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { keepPreviousData } from '@tanstack/react-query'
import { path } from '../constants/path'
import { UserListConfig } from '@/models/interface/user.interface'
import { QueryUserConfig } from '@/hooks/useUserQueryConfig'
import { STATE_TIME } from '@/configs/consts'
import { AxiosError } from 'axios'

export const useUserQuery = ({ queryString }: { queryString: QueryUserConfig }) => {
  return useQuery({
    queryKey: [path.admin.manage.user, queryString],
    queryFn: () => userApi.get(queryString as UserListConfig),
    placeholderData: keepPreviousData,
    staleTime: STATE_TIME
  })
}
interface UpdateUserMutationProps {
  handleError?: (error: AxiosError) => void
}
export const useUpdateUserMutation = ({ handleError }: UpdateUserMutationProps) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: mutationKeys.updateProfile,
    mutationFn: userApi.update,
    onSuccess: () => {
      Toast.success({ description: 'Cập nhật thông tin thành công.' })
      queryClient.invalidateQueries({ queryKey: [path.admin.manage.user] })
    },
    onError: handleError
  })
}
export const useAddRoleMutation = ({ handleError }: UpdateUserMutationProps) => {
  return useMutation({
    mutationKey: mutationKeys.updateProfile,
    mutationFn: userApi.addRole,
    onSuccess: () => {
      Toast.success({ description: 'Thêm vai trò người dùng thành công.' })
    },
    onError: handleError
  })
}

export const useUserDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => userApi.delete(id),
    onSuccess: () => {
      Toast.success({ description: 'Xóa người dùng thành công' })
      queryClient.invalidateQueries({ queryKey: [path.admin.manage.user] })
    },
    onError: (error) => {
      handleToastError(error)
    }
  })
}

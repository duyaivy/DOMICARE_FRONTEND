import { useMutation } from '@tanstack/react-query'
import { mutationKeys } from '../helpers/key-tanstack'
import { fileApi } from '../services/file.service'
import { handleToastError } from '@/utils/handleErrorAPI'
import { Toast } from '@/utils/toastMessage'
interface UploadFileMutationProps {
  formData: FormData
  onUploadProgress?: (progressEvent: ProgressEvent) => void
}
export const useUploadFileMutation = () =>
  useMutation({
    mutationKey: mutationKeys.uploadFile,
    mutationFn: ({ formData, onUploadProgress }: UploadFileMutationProps) =>
      fileApi.post(formData, { onUploadProgress }),
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

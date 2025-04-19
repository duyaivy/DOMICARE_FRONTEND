import { FilePostResponse } from '@/models/interface/file.interface'
import axiosClient from './axios-client'
import { SuccessResponse } from '@/models/interface/response.interface'

const API_FILE_URL = '/api/cloudinary/files'

export const fileApi = {
  // get: (params: UserListConfig) => {
  //   return axiosClient.get<SuccessResponse<File>>(API_FILE_URL, { params })
  // },
  getAll: () => {
    return axiosClient.get<SuccessResponse<File[]>>(`${API_FILE_URL}/all`)
  },
  post: (body: FormData) => {
    return axiosClient.post<SuccessResponse<FilePostResponse>>(API_FILE_URL, body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  delete: (id: number) => {
    return axiosClient.delete<SuccessResponse<null>>(`${API_FILE_URL}/${id}`)
  },
  getById: (id: number) => {
    return axiosClient.get<SuccessResponse<File>>(`${API_FILE_URL}/${id}`)
  }
}

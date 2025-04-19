export interface File {
  id: number
  name: string
  type: string
  size?: string
  url?: string
  publicId?: string
  createBy?: string
  updateBy?: string
  createAt?: string
  updateAt?: string
}
export interface FilePostResponse {
  id: number
  name: string
}

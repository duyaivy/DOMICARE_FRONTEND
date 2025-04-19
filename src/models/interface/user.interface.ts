export interface User {
  id?: number
  name?: string
  email?: string
  password?: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  phone?: string
  address?: string
  emailConfirmationToken?: string
  googleId?: string
  createBy?: string
  updateBy?: string
  createAt?: string
  updateAt?: string
  roles?: role[]
  avatar?: string
  dateOfBirth?: string
  emailConfirmed?: boolean
}
export interface UserUpdate {
  name?: string
  phone?: string
  imageId?: string
  addres?: string
  dateOfBirth?: Date
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  newPassword?: string
  oldPassword?: string
}

export interface UserUpdateAPI extends Omit<UserUpdate, 'dateOfBirth'> {
  dateOfBirth?: string
}
export type role = {
  id: number
  name: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_SALE'
  active: boolean
  description?: string
  createBy?: string
  updateBy?: string
  createAt?: string
  updateAt?: string
}

export interface UserResponse {
  meta: {
    page?: number
    size?: number
    total?: number
    totalPages?: number
  }
  data: User[]
}

export interface UserListConfig {
  page?: number
  size?: number
}

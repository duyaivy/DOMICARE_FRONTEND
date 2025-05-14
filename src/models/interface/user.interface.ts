import { GENDER_TYPE, ROLE_TYPE } from '../types/user.type'

export interface User {
  id?: number
  name?: string
  email?: string
  password?: string
  phone?: string
  address?: string
  avatar?: string
  googleId?: string
  isActive?: boolean
  dateOfBirth?: string
  emailConfirmationToken?: string
  createBy?: string
  updateBy?: string
  createAt?: string
  updateAt?: string
  roles?: role[]
  emailConfirmed?: boolean
  gender?: GENDER_TYPE
}

export interface UserUpdate {
  name?: string
  phone?: string
  imageId?: number
  addres?: string
  dateOfBirth?: Date
  gender?: GENDER_TYPE
  newPassword?: string
  oldPassword?: string
}
export interface UserUpdateRequest extends Omit<UserUpdate, 'dateOfBirth'> {
  dateOfBirth?: string
}

export type role = {
  id?: number
  name?: ROLE_TYPE
  description?: string
  active?: boolean
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
  searchRoleName?: ROLE_TYPE
}
export interface roleAddRequest {
  userId: number
  roleIds: number[]
}

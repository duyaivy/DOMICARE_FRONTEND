export interface User {
  id?: number
  name?: string
  email?: string
  password?: string
  phone?: string
  address?: string
  emailConfirmationToken?: string
  googleId?: string
  createBy?: string
  updateBy?: string
  createAt?: string
  updateAt?: string
  roles?: string[]
  avatar?: string
  emailConfirmed?: boolean
}

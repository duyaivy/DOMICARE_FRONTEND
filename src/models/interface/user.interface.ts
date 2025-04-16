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
  roles?: role[]
  avatar?: string
  emailConfirmed?: boolean
}

export type role = {
  id: number
  name: 'ROLE_ADMIN' | 'ROLE_USER'
}

// define the Login interface
export interface LoginResponse {
  access_token: string
  refresh_token: string
  user: User
}

// define the Account interface
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
  emailConfirmed?: boolean
}

// define the RegisterReponse interface
export interface RegisterReponse {
  id: number
  email: string
  password: string
  accessToken: string
  refreshToken: string
  roles: string[]
  emailConfirmed: boolean
}

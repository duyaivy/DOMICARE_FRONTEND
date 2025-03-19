import { User } from './user.interface'

// define the Login interface
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
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

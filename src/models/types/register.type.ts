import { LoginType } from './login.type'

export type RegisterType = LoginType & {
  confirm_password: string
}

import { loginType } from './login.type'

export type registerType = loginType & {
  confirm_password: string
}

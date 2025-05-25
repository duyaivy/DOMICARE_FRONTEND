import ChangeProfile from '@/components/ChangeProfile'
import SectionUser from '../../Layouts/SectionUser'

export default function Profile() {
  return (
    <SectionUser title='Hồ sơ của tôi' description='Quản lý thông tin hồ sơ để bảo mật tài khoản'>
      <ChangeProfile />
    </SectionUser>
  )
}

import ChangeProfile from '@/components/ChangeProfile'
import HeaderSettings from '../HeaderSettings'

export default function ProfileAdmin() {
  return (
    <HeaderSettings title='Cài đặt cá nhân' description='Thay đổi thông tin cá nhân của bạn.'>
      <ChangeProfile />
    </HeaderSettings>
  )
}

import { useLocation } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { Helmet as ReactHelmet } from 'react-helmet-async'

const PAGE_TITLES = {
  // Public routes
  [path.home]: 'Trang Chủ - DomiCare',
  [path.aboutUs]: 'Tại sao lại chọn DomiCare - DomiCare',
  [path.products]: 'Dịch vụ cung cấp - DomiCare',
  [path.product]: 'Dịch vụ - DomiCare',
  [path.productDetail]: 'Chi tiết dịch vụ - DomiCare',
  [path.blog]: 'Tin tức - DomiCare',
  [path.recuitment]: 'Tuyển dụng - DomiCare',
  [path.coming_soon]: 'Sắp ra mắt - DomiCare',
  [path.notFound]: 'Trang không tìm thấy - DomiCare',

  // Auth routes
  [path.login]: 'Đăng nhập - DomiCare',
  [path.register]: 'Đăng ký - DomiCare',
  [path.forgotPassword]: 'Quên mật khẩu - DomiCare',

  // User routes
  [path.user.profile]: 'Thông tin cá nhân - DomiCare',
  [path.user.history]: 'Lịch sử đơn hàng - DomiCare',
  [path.user.change_password]: 'Đổi mật khẩu - DomiCare',
  [path.user.settings]: 'Cài đặt tài khoản - DomiCare',

  // Admin routes
  [path.admin.dashboard]: 'Báo cáo & Thống kê - DomiCare Admin',
  [path.admin.coming_soon]: 'Sắp ra mắt - DomiCare Admin',
  [path.admin.booking]: 'Quản lý đơn hàng - DomiCare Admin',
  [path.admin.manage.user]: 'Quản lý khách hàng - DomiCare Admin',
  [path.admin.manage.sale]: 'Quản lý nhân viên - DomiCare Admin',
  [path.admin.manage.category]: 'Quản lý danh mục - DomiCare Admin',
  [path.admin.manage.product]: 'Quản lý dịch vụ - DomiCare Admin',
  [path.admin.manage.post]: 'Quản lý bài viết - DomiCare Admin',
  [path.admin.setting.profile]: 'Cài đặt cá nhân - DomiCare Admin',
  [path.admin.setting.system]: 'Cài đặt hệ thống - DomiCare Admin'
} as const

interface HelmetProps {
  title?: string
}

export default function Helmet({ title }: HelmetProps) {
  const location = useLocation()
  const titleAuto = PAGE_TITLES[location.pathname as keyof typeof PAGE_TITLES] || 'DomiCare'

  return (
    <ReactHelmet>
      <title>{title ? title : titleAuto}</title>
      <meta name='description' content='Domicare - Dịch vụ vệ sinh chuyên nghiệp' />
    </ReactHelmet>
  )
}

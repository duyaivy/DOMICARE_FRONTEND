import { path } from './path'

export const BreadcrumbConfig = {
  admin: {
    label: 'Quản lý',
    href: path.admin.dashboard
  },
  report: {
    label: 'Báo cáo & thống kê',
    href: path.admin.report
  },
  dashboard: {
    label: 'Bảng điều khiển',
    href: path.admin.dashboard
  },
  user: {
    label: 'Khách hàng',
    href: path.admin.manage.user
  },
  category: {
    label: 'Danh mục',
    href: path.admin.manage.category
  },
  product: {
    label: 'Dịch vụ',
    href: path.admin.manage.product
  },
  profile: {
    label: 'Cá nhân',
    href: path.admin.setting.profile
  },
  setting: {
    label: 'Cài đặt',
    href: path.admin._setting
  },
  sale: {
    label: 'Nhân viên',
    href: path.admin.manage.sale
  },
  manage: {
    label: 'Quản lý hệ thống',
    href: path.admin._manage
  },
  system: {
    label: 'Hệ thống',
    href: path.admin.setting.system
  }
} as const

export type BreadcrumbKey = keyof typeof BreadcrumbConfig

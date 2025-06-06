import { Archive, LayoutDashboard, LucideProps } from 'lucide-react'
import { path } from './path'
import { ChartNoAxesCombined, Bot, Users, Settings } from 'lucide-react'
import { getUserFromLocalStorage } from '../shared/storage'

// Helper function to create URL with saleId
const createSaleOrderUrl = () => {
  const saleId = getUserFromLocalStorage()?.id
  return `${path.admin.report}?saleId=${saleId}`
}

export interface SidebarItem {
  title: string
  url: string
  isActive?: boolean
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  items?: ItemChild[]
}
export type ItemChild = {
  title: string
  url: string
}

export interface Sidebar {
  ROLE_ADMIN: SidebarItem[]
  ROLE_SALE: SidebarItem[]
}

export const initialSideBar: Sidebar = {
  ROLE_ADMIN: [
    {
      title: 'Báo cáo & Thống kê',
      url: path.admin.dashboard,
      icon: ChartNoAxesCombined
    },
    {
      title: 'Quản lý đơn hàng',
      url: path.admin.report,
      icon: LayoutDashboard
    },
    {
      title: 'Quản lý người dùng',
      url: path.admin.manage.sale,
      icon: Users,
      isActive: true,
      items: [
        {
          title: 'Nhân viên',
          url: path.admin.manage.sale
        },
        {
          title: 'Khách hàng',
          url: path.admin.manage.user
        }
      ]
    },
    {
      title: 'Quản lý hệ thống',
      url: path.admin.manage.category,
      icon: Bot,
      isActive: true,
      items: [
        {
          title: 'Danh mục',
          url: path.admin.manage.category
        },
        {
          title: 'Dịch vụ',
          url: path.admin.manage.product
        },
        {
          title: 'Bài viết',
          url: path.admin.manage.post
        }
      ]
    },

    {
      title: 'Cài đặt',
      url: path.admin.setting.profile,
      isActive: true,
      icon: Settings,
      items: [
        {
          title: 'Cá nhân',
          url: path.admin.setting.profile
        },
        {
          title: 'Hệ thống',
          url: path.admin.setting.system
        }
      ]
    }
  ],
  ROLE_SALE: [
    {
      title: 'Báo cáo & Thống kê',
      url: path.admin.dashboard,
      icon: ChartNoAxesCombined
    },
    {
      title: 'Tất cả đơn hàng',
      url: path.admin.report,
      icon: LayoutDashboard
    },
    {
      title: 'Đơn hàng của tôi',
      url: createSaleOrderUrl(),
      icon: Archive
    },
    {
      title: 'Cài đặt',
      url: path.admin.setting.profile,
      isActive: true,
      icon: Settings,
      items: [
        {
          title: 'Cá nhân',
          url: path.admin.setting.profile
        },
        {
          title: 'Hệ thống',
          url: path.admin.setting.system
        }
      ]
    }
  ]
}

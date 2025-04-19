import { LucideProps } from 'lucide-react'
import { path } from './path'
import { ChartNoAxesCombined, House, Bot, Users, Settings2 } from 'lucide-react'

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
  admin: SidebarItem[]
  sale: SidebarItem[]
}

export const initialSideBar: Sidebar = {
  admin: [
    {
      title: 'Trang chủ',
      url: path.admin.dashboard,
      icon: House
    },
    {
      title: 'Báo cáo & Thống kê',
      url: path.admin.report,
      icon: ChartNoAxesCombined
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
          title: 'Sản phẩm',
          url: path.admin.manage.product
        },
        {
          title: 'Bài viết',
          url: '#'
        }
      ]
    },

    {
      title: 'Cài đặt',
      url: path.admin.setting.profile,
      isActive: true,
      icon: Settings2,
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
  sale: [
    {
      title: 'Trang chủ',
      url: '#',
      icon: House
    },
    {
      title: 'Báo cáo & Thống kê',
      url: '#',
      icon: ChartNoAxesCombined
    },
    {
      title: 'Quản lý người dùng',
      url: '#',
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
    }
  ]
}

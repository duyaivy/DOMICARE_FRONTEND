import { IconDashboard } from '@/assets/icons'
import { TSidebarLinks } from '@/models/types/general.type'

export const sidebarLinks: TSidebarLinks[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    path: '/admin/dashboard'
  },
  {
    title: 'Profile',
    icon: <IconDashboard />,
    path: '/admin/setting/profile'
  }
]

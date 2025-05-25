import { BadgeCheck, Bell, ChevronsUpDown, LogOut, Sparkles } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { User } from '@/models/interface/user.interface'
import { Link } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { useLogoutMutation } from '@/core/queries/auth.query'

export function NavUser({ user }: { user?: User }) {
  const { isMobile } = useSidebar()
  const logoutMutation = useLogoutMutation()
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='ml-1 h-8 w-8 rounded-lg'>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user?.name}</span>
                <span className='truncate text-xs'>{user?.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user?.name}</span>
                  <span className='truncate text-xs'>{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={path.admin.dashboard}>
                <DropdownMenuItem>
                  <Sparkles />
                  Nâng cấp hệ thống
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={path.admin.manage.user}>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Tài khoản
                </DropdownMenuItem>
              </Link>
              <Link to={path.admin.dashboard}>
                <DropdownMenuItem>
                  <Bell />
                  Thông báo
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <button onClick={handleLogout}>
              <DropdownMenuItem>
                <LogOut />
                Đăng xuất
              </DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from '@/components/ui/sidebar'
import { NavMain } from './NavMain'
import { NavUser } from './NavUser'
import { AppContext } from '@/core/contexts/app.context'
import { rolesCheck } from '@/utils/rolesCheck'
import LogoSideNav from '@/components/LogoSideNav'
import { Sidebar as SidebarType } from '@/core/constants/sidebar.const'
import { ComponentProps, useContext } from 'react'

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { profile, sidebar } = useContext(AppContext)
  const isAdmin = rolesCheck.isAdmin(profile?.roles || [])
  const dataNav = isAdmin ? (sidebar as SidebarType).admin : (sidebar as SidebarType).sale
  const { open } = useSidebar()
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>{open ? <LogoSideNav /> : null}</SidebarHeader>
      <SidebarContent>
        <NavMain data={dataNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={profile || {}} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

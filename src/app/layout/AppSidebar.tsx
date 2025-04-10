'use client'
import * as React from 'react'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from '@/components/ui/sidebar'
import { NavMain } from './NavMain'

import { NavUser } from './NavUser'
import { AppContext } from '@/core/contexts/app.context'
import { rolesCheck } from '@/utils/rolesCheck'
import LogoSideNav from '@/components/LogoSideNav'
import { Sidebar as SidebarType } from '@/core/constants/sidebar.const'

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { profile, sidebar } = React.useContext(AppContext)
  const isAdmin = rolesCheck.isAdmin(profile?.roles || [])
  const dataNav = isAdmin ? (sidebar as SidebarType).admin : (sidebar as SidebarType).sale
  const { open } = useSidebar()
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>{open ? <LogoSideNav /> : <></>}</SidebarHeader>
      <SidebarContent>
        <NavMain items={dataNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={profile || {}} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

'use client'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'
import { produce } from 'immer'
import LucideIcons from '@/components/ui/lucide-icon'
import { useContext } from 'react'
import { AppContext } from '@/core/contexts/app.context'
import { rolesCheck } from '@/utils/rolesCheck'
import { Sidebar } from '@/core/constants/sidebar.const'

export function NavMain({
  items
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { sidebar, setSidebar, profile } = useContext(AppContext)
  const isAdmin = rolesCheck.isAdmin(profile?.roles || [])
  const context = useSidebar()

  const handleClickSidebarItem = (item: string, index: number) => {
    if (isAdmin) {
      const value = !sidebar?.admin[index].isActive

      setSidebar(
        produce((draft) => {
          ;(draft as Sidebar).admin[index].isActive = value
        })
      )
    } else {
      const value = !sidebar?.sale[index].isActive

      setSidebar(
        produce((draft) => {
          ;(draft as Sidebar).sale[index].isActive = value
        })
      )
    }
  }
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild onClick={() => handleClickSidebarItem(item.title, index)}>
                {context.open ? (
                  item.items && item.items.length > 0 ? (
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <LucideIcons icon={item.icon} />}
                      <span>{item.title}</span>
                      {item.items && item.items.length > 0 && (
                        <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      )}
                    </SidebarMenuButton>
                  ) : (
                    <Link to={item.url}>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <LucideIcons icon={item.icon} />}
                        <span>{item.title}</span>
                        {item.items && item.items.length > 0 && (
                          <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        )}
                      </SidebarMenuButton>
                    </Link>
                  )
                ) : (
                  <Link to={item.url}>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <LucideIcons icon={item.icon} />}
                      <span>{item.title}</span>
                      {item.items && item.items.length > 0 && (
                        <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      )}
                    </SidebarMenuButton>
                  </Link>
                )}
              </CollapsibleTrigger>
              {item.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

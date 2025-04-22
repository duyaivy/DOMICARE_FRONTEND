import { ChevronRight } from 'lucide-react'
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
import { useContext, useMemo } from 'react'
import { AppContext } from '@/core/contexts/app.context'
import { rolesCheck } from '@/utils/rolesCheck'
import { ItemChild, Sidebar, SidebarItem } from '@/core/constants/sidebar.const'

interface NavMainProps {
  data: SidebarItem[]
}

export function NavMain({ data }: NavMainProps) {
  const { sidebar, setSidebar, profile } = useContext(AppContext)
  const isAdmin = useMemo(() => rolesCheck.isAdmin(profile?.roles || []), [profile?.roles])
  const context = useSidebar()

  const toggleSidebarItem = (index: number, type: keyof Sidebar) => {
    if (!sidebar || !sidebar[type] || !sidebar[type][index]) return
    const value = !sidebar[type][index].isActive
    setSidebar(
      produce((draft) => {
        ;(draft as Sidebar)[type][index].isActive = value
      })
    )
  }

  const handleClickSidebarItem = (index: number) => {
    toggleSidebarItem(index, isAdmin ? 'ROLE_ADMIN' : 'ROLE_SALE')
  }

  const renderSidebarButton = (item: SidebarItem, index: number) => (
    <CollapsibleTrigger asChild onClick={() => handleClickSidebarItem(index)}>
      {context.open ? (
        item.items && item.items.length > 0 ? (
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <LucideIcons icon={item.icon} />}
            <span>{item.title}</span>
            {item.items.length > 0 && (
              <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
            )}
          </SidebarMenuButton>
        ) : (
          <Link to={item.url}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <LucideIcons icon={item.icon} />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </Link>
        )
      ) : (
        <Link to={item.url}>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <LucideIcons icon={item.icon} />}
            <span>{item.title}</span>
          </SidebarMenuButton>
        </Link>
      )}
    </CollapsibleTrigger>
  )

  return (
    <SidebarGroup>
      <SidebarMenu>
        {Array.isArray(data) &&
          data.map((item: SidebarItem, index: number) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
              <SidebarMenuItem>
                {renderSidebarButton(item, index)}
                {item.items && item.items.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem: ItemChild) => (
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

import { ReactNode } from 'react'
import { AppSidebar } from './AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import Header from './Header'

interface ILayoutMainProps {
  children: ReactNode
}

const LayoutMain = ({ children }: ILayoutMainProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className='flex-1 overflow-auto '>
          <Header />
          <div className='p-4'>{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default LayoutMain

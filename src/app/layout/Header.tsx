import { SidebarTrigger } from '@/components/ui/sidebar'
import { path } from '@/core/constants/path'
import { Bell, User } from 'lucide-react'

import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='flex justify-between items-center w-full h-10 md:h-15 bg-[#feffdb]'>
      <SidebarTrigger />
      <div className='flex justify-center items-center gap-2 mr-5'>
        <Link
          className='hover:bg-bg duration-300 h-8 w-8 md:h-10 md:w-10 rounded-full flex justify-center items-center'
          to={path.admin.dashboard}
        >
          <Bell />
        </Link>
        <Link
          className='hover:bg-bg duration-300 h-8 w-8 md:h-10 md:w-10 rounded-full flex justify-center items-center'
          to={path.admin.dashboard}
        >
          <User />
        </Link>
      </div>
    </div>
  )
}

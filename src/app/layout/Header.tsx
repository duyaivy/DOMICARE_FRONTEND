import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { path } from '@/core/constants/path'
import { AppContext } from '@/core/contexts/app.context'
import { Bell } from 'lucide-react'
import { useContext } from 'react'

import { Link } from 'react-router-dom'

export default function Header() {
  const { profile } = useContext(AppContext)

  return (
    <div className='flex justify-between items-center w-full h-12 md:h-15 bg-[linear-gradient(to_left,_#A0F0DC,_#02cf96)]'>
      <SidebarTrigger />
      <div className='flex justify-center items-center gap-3 mr-5'>
        <Link
          className='hover:bg-bg shadow duration-300 h-8 w-8 md:h-10 md:w-10 rounded-full flex justify-center items-center'
          to={path.admin.dashboard}
        >
          <Bell className='!w-5 h-auto' />
        </Link>
        <Link className='duration-300 h-8 md:h-12  gap-2 flex justify-center items-center' to={path.admin.dashboard}>
          <Avatar>
            <AvatarImage
              src={profile?.avatar ? profile.avatar : 'https://photo.znews.vn/w660/Uploaded/mfnuy/2022_09_01/s1_1.jpg'}
              alt={profile?.name}
            />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>

          <p className='hidden md:block text-sm text-black group-hover:text-main md:max-w-23 lg:max-w-30 truncate duration-300  '>
            {profile?.name ? profile.name : profile?.email}
          </p>
        </Link>
      </div>
    </div>
  )
}

import { logoSecond } from '@/assets/images'
import { path } from '@/core/constants/path'

import { Link } from 'react-router-dom'

export default function LogoSideNav() {
  return (
    <div
      data-slot='sidebar-menu-button'
      data-sidebar='menu-button'
      data-active={false}
      className={'w-[90%] mx-auto py-2 px-3'}
    >
      <Link to={path.admin.dashboard}>
        <img src={logoSecond} alt='DomiCare' />
      </Link>
    </div>
  )
}

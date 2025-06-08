import { logoSecond } from '@/assets/images'
import { path } from '@/core/constants/path'
import { Link } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  ListItem
} from '../ui/navigation-menu'
import classnames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import IconHeadphone from '@/assets/icons/icon-headphone'
import IconChevronUp from '@/assets/icons/icon-chevron-up'
import { AppContext } from '@/core/contexts/app.context'
import { PhoneCallIcon } from 'lucide-react'
import { ICON_SIZE_EXTRA } from '@/core/configs/icon-size'
import IconBar from '@/assets/icons/icon-bar'
import { useLogoutMutation } from '@/core/queries/auth.query'

export default function Header() {
  const { isAuthenticated, profile, categories } = useContext(AppContext)

  const [isShow, setIsShow] = useState<boolean>(false)
  const handleScrollUp = () => animateScroll.scrollTo(0, { smooth: true, duration: 500 })
  const [showUpBtn, setShowUpBtn] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowUpBtn(true)
      } else {
        setShowUpBtn(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const logoutMutation = useLogoutMutation()
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <header className='w-full h-10 md:h-16 z-50 relative mb-[64px] md:mb-0'>
      <div className='bg-secondary w-full h-10 md:h-16'>
        <div className='max-w-7xl mx-auto px-4 py-2 h-full flex justify-center md:justify-end items-center'>
          <a href='tel: 0987654321' type='phone'>
            <div className='flex justify-center items-center gap-1 cursor-pointer'>
              <IconHeadphone className='fill-black w-5 h-5  md:w-8 md:h-8' />
              <p className='text-black text-sm font-bold'> Hỗ trợ khách hàng</p>
            </div>
          </a>
        </div>
      </div>
      <div className='absolute top-10 md:top-[64px] mb-[64px] right-0 left-0 bg-white md:bg-white/80 h-[60px] md:h-[100px] z-90'>
        <div className='max-w-7xl mx-auto px-4  h-full flex justify-end items-center'>
          <div className='grid grid-cols-12 gap-4 w-full h-full'>
            <div className='col-span-8 md:col-span-3 order-2'>
              <div className='flex justify-center items-center h-full'>
                <Link to={path.home} className='flex justify-between items-center '>
                  <img className=' w-auto h-15 ' src={logoSecond} alt='logoDomicare' />
                </Link>
              </div>
            </div>
            <div className='col-span-7 order-2 hidden md:block'>
              <div className='flex h-full  items-center justify-center  gap-4 lg:gap-6 '>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <NavigationMenuLink asChild className={'hover:bg-transparent'}>
                          <Link to={path.products}>Dịch vụ cung cấp</Link>
                        </NavigationMenuLink>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className='w-[200px] min-h-20 py-2 flex flex-col justify-center items-center gap-1  '>
                          {categories &&
                            categories.map((cate) => (
                              <ListItem
                                key={cate.id}
                                to={{
                                  pathname: path.products,
                                  search: `categoryid=${cate.id}`
                                }}
                                children={cate.name}
                              />
                            ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link to={path.blog}>Tin tức</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link to={path.recuitment}>Tuyển dụng </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link to={path.aboutUs}>Tại sao lại chọn DomiCare? </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
            <div className='col-span-2 md:col-span-2 order-1 md:order-3'>
              <div className='flex h-full justify-end items-center '>
                {isAuthenticated && profile ? (
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className='!bg-transparent hover:!bg-transparent text-sm !text-tmain hover:!text-main duration-300 flex h-full justify-start md:justify-end items-center group cursor-pointer  w-full !p-0 !pl-0 md:!ml-4 md:!pr-0 '>
                          <div className='shrink-0 flex justify-center items-center  w-10 h-10  '>
                            <Avatar>
                              <AvatarImage
                                src={
                                  profile.avatar
                                    ? profile.avatar
                                    : 'https://photo.znews.vn/w660/Uploaded/mfnuy/2022_09_01/s1_1.jpg'
                                }
                                alt='@shadcn'
                              />
                              <AvatarFallback>CC</AvatarFallback>
                            </Avatar>
                          </div>
                          <p className='hidden md:block text-sm text-tmain group-hover:text-main md:max-w-23 lg:max-w-30 truncate duration-300  '>
                            {profile.name ? profile.name : profile.email}
                          </p>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className='w-[150px] min-h-10 py-2 flex flex-col justify-center items-center gap-1'>
                            <ListItem to={path.user.profile}>Tài khoản của tôi</ListItem>
                            <ListItem to={path.user.history}>Lịch sử dịch vụ</ListItem>
                            <ListItem to={path.user.settings}>Cài đặt</ListItem>

                            <ListItem to={path.login}>
                              <button onClick={handleLogout} className='cursor-pointer font-semibold'>
                                Đăng xuất
                              </button>
                            </ListItem>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                ) : (
                  <div className='flex justify-end h-full items-center '>
                    <Link
                      to={path.login}
                      className='rounded-sm  md:px-4 mo:!px-8 text-sub2 py-2 duration-300 md:bg-main md:text-white md:hover:bg-main/90 '
                    >
                      Đăng nhập
                    </Link>
                  </div>
                )}

                {/* Đăng nhập */}
              </div>
            </div>
            <div className='col-span-2 order-3 md:hidden'>
              <button
                onClick={() => {
                  setIsShow((prev) => !prev)
                }}
                className='h-full w-full flex justify-end items-center p-2 pr-0 cursor-pointer'
              >
                <IconBar className='fill-black' />
              </button>
            </div>
          </div>
        </div>
        {/* popover */}
        <div
          className={classnames(
            'absotute top-[-100%] right-0 left-0 bg-white shadow h-80px] translate-y-[-80px] opacity-0 invisible duration-300 z-10',
            { 'translate-y-[0px] opacity-100 visible ': isShow }
          )}
        >
          <ul className='flex w-full flex-col justify-center items-center py-2'>
            <ListItem to={path.products}>
              <p className='text-sm text-tmain py-2 text-center line-clamp-2 group-hover:text-main duration-300'>
                Dịch vụ cung cấp
              </p>
            </ListItem>
            <ListItem to={path.blog}>
              <p className='text-sm text-tmain py-2 text-center line-clamp-2 group-hover:text-main duration-300'>
                Tin tức
              </p>
            </ListItem>
            <ListItem to={path.recuitment}>
              <p className='text-sm text-tmain py-2 text-center line-clamp-2 group-hover:text-main duration-300'>
                Tuyển dụng
              </p>
            </ListItem>
            <ListItem to={path.aboutUs}>
              <p className='text-sm text-tmain py-2 text-center line-clamp-2 group-hover:text-main duration-300'>
                Tại sao lại chọn DomiCare?
              </p>
            </ListItem>
          </ul>
        </div>
      </div>

      <div className='fixed bottom-20 right-2 md:bottom-30   overflow-hidden z-50'>
        {showUpBtn && (
          <button
            onClick={handleScrollUp}
            className='flex rounded-full shadow-sm m-2 items-center justify-center w-18 h-18 cursor-pointer  bg-emerald-400'
          >
            <IconChevronUp className='fill-white w-10 h-10 text-center ml-1' />
          </button>
        )}
        <a href='tel:0987654321'>
          <div className='flex rounded-full mt-6 shadow-sm m-2 items-center justify-center w-18 h-18 cursor-pointer animate-bounce text-white bg-emerald-400'>
            <PhoneCallIcon width={ICON_SIZE_EXTRA} height={ICON_SIZE_EXTRA} />
          </div>
        </a>
      </div>
    </header>
  )
}

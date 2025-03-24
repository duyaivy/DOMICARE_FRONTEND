import IconChevronUp from '@/assets/icons/icon-chevron-up'
import { ICON_SIZE_MEDIUM } from '@/core/configs/icon-size'
import { path } from '@/core/constants/path'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { createSearchParams, Link } from 'react-router-dom'

export default function CategoryList() {
  const [isShow, setIsShow] = useState<boolean>(false)
  return (
    <div className='bg-white rounded-sm md:rounded-2xl relative'>
      <ul className={'ml-2 flex flex-col items-start justify-start gap-1 p-2 '}>
        <li
          onClick={() => setIsShow((prev) => !prev)}
          className='w-full flex items-center justify-between text-sub0 capitalize font-semibold md:hidden'
        >
          <Link
            to={{
              pathname: path.products
            }}
          >
            Danh Mục
          </Link>

          <IconChevronUp
            height={ICON_SIZE_MEDIUM}
            width={ICON_SIZE_MEDIUM}
            className={classNames('fill-black duration-300 ', {
              'rotate-180': isShow
            })}
          />
        </li>
        <li className=' text-sub0 capitalize font-semibold md:block hidden'>
          <Link
            to={{
              pathname: path.products
            }}
          >
            Danh Mục
          </Link>
        </li>
        {Array(8)
          .fill(0)
          .map((_, index) => {
            return (
              <li
                key={index}
                className='hidden md:block w-full hover:text-main duration-300 hover:translate-x-[5px] hover:bg-bg rounded-md cursor-pointer py-2'
              >
                <Link
                  to={{
                    pathname: path.products,
                    search: createSearchParams({
                      category: 'name'
                    }).toString()
                  }}
                  className='block w-full h-full md:text-sub1 lg:text-sub0 capitalize px-2 text-left'
                >
                  Dọn dẹp nhà cửa
                </Link>
              </li>
            )
          })}
      </ul>
      <AnimatePresence>
        {isShow && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='absolute top-full left-0 right-0 bg-white/80 !z-99 overflow-hidden rounded-b-md '
          >
            {Array(8)
              .fill(0)
              .map((_, index) => {
                return (
                  <li
                    key={index}
                    className='w-full hover:text-main duration-300 hover:translate-x-[5px] hover:bg-bg rounded-md cursor-pointer py-2'
                  >
                    <Link
                      to={{
                        pathname: path.products
                      }}
                      className='block w-full h-full  md:text-sub1 lg:text-sub0 capitalize px-2 pl-4 text-left '
                    >
                      Dọn dẹp nhà cửa
                    </Link>
                  </li>
                )
              })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

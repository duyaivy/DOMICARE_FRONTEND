import IconChevronUp from '@/assets/icons/icon-chevron-up'
import { Skeleton } from '@/components/ui/skeleton'
import { ICON_SIZE_MEDIUM } from '@/core/configs/icon-size'
import { path } from '@/core/constants/path'
import { Category } from '@/models/interface/category.interface'
import { isActive } from '@/utils/isActiveLocation'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useState } from 'react'
import { createSearchParams, Link, useLocation } from 'react-router-dom'

export default function CategoryList({ categories, isLoading }: { categories?: Category[]; isLoading: boolean }) {
  const [isShow, setIsShow] = useState<boolean>(false)
  const { search } = useLocation()
  const isAllActive = categories?.some((cate) => isActive(`categoryid=${cate.id}`, search))
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
        {isLoading ? (
          <div className='hidden md:block w-full space-y-3 p-2'>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className='w-full h-8 rounded-t-sm' />
              ))}
          </div>
        ) : (
          <Fragment>
            <li
              className={classNames(
                'hidden md:block w-full  duration-300 hover:translate-x-[5px] hover:text-main rounded-md cursor-pointer py-2',
                { 'text-main': isActive(`category=${2}`, search) }
              )}
            >
              <Link
                to={{
                  pathname: path.products,
                  search: createSearchParams({
                    categoryid: 'cate.id.toString()'
                  }).toString()
                }}
                className={classNames('block w-full h-full md:text-sub1 lg:text-sub0 capitalize px-2 text-left', {
                  'text-main': !isAllActive
                })}
              >
                Tất cả
              </Link>
            </li>
            {categories &&
              categories.map((cate) => {
                return (
                  <li
                    key={cate.id}
                    className={classNames(
                      'hidden md:block w-full  duration-300 hover:translate-x-[5px] hover:text-main rounded-md cursor-pointer py-2',
                      { 'text-main': isActive(`categoryid=${cate.id}`, search) }
                    )}
                  >
                    <Link
                      to={{
                        pathname: path.products,
                        search: createSearchParams({
                          categoryid: cate.id.toString()
                        }).toString()
                      }}
                      className='block w-full h-full md:text-sub1 lg:text-sub0 capitalize px-2 text-left'
                    >
                      {cate.name}
                    </Link>
                  </li>
                )
              })}
          </Fragment>
        )}
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
            {isLoading ? (
              <div className=' w-full space-y-3 p-2'>
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton key={index} className='w-full h-8 rounded-t-sm' />
                  ))}
              </div>
            ) : (
              categories &&
              categories.map((cate) => (
                <li
                  key={cate.id}
                  className={classNames(
                    ' w-full  duration-300 hover:translate-x-[5px] hover:text-main rounded-md cursor-pointer py-2',
                    { 'text-main': isActive(`category%3D${cate.id}`, search) }
                  )}
                >
                  <Link
                    to={{
                      pathname: path.products,
                      search: createSearchParams({
                        categoryid: cate.id.toString()
                      }).toString()
                    }}
                    className='block w-full h-full md:text-sub1 lg:text-sub0 capitalize px-2 text-left'
                  >
                    {cate.name}
                  </Link>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

import { queryString } from '@/models/types/queryString.type'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
interface PaginationProps {
  queryString: queryString
  pageSize: number
  path: string
}
const RANGE = 2
export default function Pagination({ queryString, pageSize, path }: PaginationProps) {
  const page = Number(1) // config sau

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='bg-white/40  w-8 h-9 flex justify-center items-center cursor-pointer'>
            <svg className='w-4 h-4  fill-black' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
              <path d='M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z' />
            </svg>
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='bg-white/40 w-8 h-9 flex justify-center items-center cursor-pointer'>
            <svg className='w-4 h-4  fill-black' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
              <path d='M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z' />
            </svg>
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Điều kiện để return về ...
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path,
              search: createSearchParams({
                ...queryString,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('bg-white w-8 h-9 flex justify-center items-center cursor-pointer rounded-[2px]', {
              '!bg-main text-white': pageNumber === page,
              'bg-white text-black': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex flex-wrap justify-center gap-2'>
      {page === 1 ? (
        <span className='mx-2 cursor-not-allowed bg-slate-200/60 w-8 h-9 flex justify-center items-center '>
          <svg className='fill-black w-4 h-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
            <path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
          </svg>
        </span>
      ) : (
        <Link
          to={{
            pathname: path,
            search: createSearchParams({
              ...queryString,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-white w-8 h-10 flex justify-center items-center cursor-pointer'
        >
          <svg className='fill-black w-4 h-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
            <path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
          </svg>
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='mx-2 cursor-not-allowed bg-slate-200/60 w-8 h-9 flex justify-center items-center'>
          <svg className='fill-black w-4 h-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
            //{' '}
            <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
            //{' '}
          </svg>
        </span>
      ) : (
        <Link
          to={{
            pathname: path,
            search: createSearchParams({
              ...queryString,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white w-8 h-9 flex justify-center items-center cursor-pointer'
        >
          <svg className='fill-black w-4 h-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
            <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
          </svg>
        </Link>
      )}
    </div>
  )
}

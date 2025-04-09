import { QueryConfig } from '@/hooks/usePrdQueryConfig'
import { createSearchParams, Link } from 'react-router-dom'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis
} from '@/components/ui/pagination'

interface PaginationProps {
  queryString: QueryConfig
  pageSize: number
  path: string
  currentPage: number
}

const RANGE = 2

export default function ProductPagination({ queryString, pageSize, path, currentPage }: PaginationProps) {
  const page = Number(currentPage)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <PaginationItem key={index}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <PaginationItem key={index}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Conditions for showing dots
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
          <PaginationItem key={index}>
            <Link
              to={{
                pathname: path,
                search: createSearchParams({
                  ...queryString,
                  page: pageNumber.toString()
                }).toString()
              }}
            >
              <PaginationLink isActive={pageNumber === page}>{pageNumber}</PaginationLink>
            </Link>
          </PaginationItem>
        )
      })
  }

  return (
    <Pagination className='col-span-12'>
      <PaginationContent>
        <PaginationItem>
          {page === 1 ? (
            <PaginationPrevious isActive={false} />
          ) : (
            <Link
              to={{
                pathname: path,
                search: createSearchParams({
                  ...queryString,
                  page: (page - 1).toString()
                }).toString()
              }}
            >
              <PaginationPrevious />
            </Link>
          )}
        </PaginationItem>

        {renderPagination()}

        <PaginationItem>
          {page === pageSize ? (
            <PaginationNext isActive={false} />
          ) : (
            <Link
              to={{
                pathname: path,
                search: createSearchParams({
                  ...queryString,
                  page: (page + 1).toString()
                }).toString()
              }}
            >
              <PaginationNext />
            </Link>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

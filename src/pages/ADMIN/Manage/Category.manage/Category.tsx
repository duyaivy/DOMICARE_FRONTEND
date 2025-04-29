import { path } from '@/core/constants/path'
import { useCategoryColumns } from './components/CategoryColumns'
import CategoryProvider from '@/core/contexts/category.context'
import DataTable from '@/components/DataTable'
import { CategoryDialog } from './components/CategoryDialog'

import { CategoryButtonAction } from './components/CategoryButtonAction'
import { useCateQueryConfig } from '@/hooks/useCateQueryConfig'
import { useCategoryQuery } from '@/core/queries/product.query'
import { DataTablePagination } from '@/components/DataTable/DataTablePagination'
import { Skeleton } from '@/components/ui/skeleton'

export default function Category() {
  return (
    <CategoryProvider>
      <CategoryContent />
    </CategoryProvider>
  )
}

function CategoryContent() {
  const queryString = useCateQueryConfig()
  const { data, isLoading } = useCategoryQuery({ queryString })
  const categoryList = data?.data?.data.data
  const pageController = data?.data?.data.meta
  const columns = useCategoryColumns()

  return (
    <>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
        {isLoading ? (
          <div className='w-full overflow-x-auto'>
            <div className='flex justify-between items-center mb-4'>
              <Skeleton className='h-10 w-1/3' />
              <Skeleton className='h-10 w-24' />
            </div>
            <div className='w-full border rounded-md overflow-hidden'>
              <div className='grid grid-cols-6 gap-2 px-4 py-2 bg-gray-100 text-sm font-semibold'>
                {['ID', 'Tên danh mục', 'Số sản phẩm', 'Ngày Tạo', 'Cập Nhật Lần Cuối'].map((text, idx) => (
                  <div key={idx} className='truncate'>
                    {text}
                  </div>
                ))}
              </div>
              {[...Array(7)].map((_, i) => (
                <div key={i} className='grid grid-cols-6 gap-2 px-4 py-3 border-t items-center'>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <Skeleton key={j} className='h-4 w-full' />
                  ))}
                </div>
              ))}
            </div>
            <div className='flex justify-between items-center mt-4'>
              <Skeleton className='h-8 w-24' />
              <Skeleton className='h-8 w-32' />
            </div>
          </div>
        ) : (
          <DataTable
            ButtonAction={<CategoryButtonAction />}
            columns={columns}
            data={categoryList || []}
            filterColumn='name'
            DataTablePagination={
              <DataTablePagination
                pageController={pageController}
                path={path.admin.manage.category}
                queryString={queryString}
              />
            }
          />
        )}
      </div>
      <CategoryDialog />
    </>
  )
}

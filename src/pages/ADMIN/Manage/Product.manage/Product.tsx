import { path } from '@/core/constants/path'
import { useProductColumns } from './components/ProductColumns'
import DataTable from '@/components/DataTable'
import { ProductDialog } from './components/ProductDialog'
import { ProductButtonAction } from './components/ProductButtonAction'
import ProductProvider from '@/core/contexts/product.context'
import { useProductQuery } from '@/core/queries/product.query'
import { usePrdQueryConfig } from '@/hooks/usePrdQueryConfig'
import { DataTablePagination } from '@/components/DataTable/DataTablePagination'
import { Skeleton } from '@/components/ui/skeleton'

export default function Product() {
  return (
    <ProductProvider>
      <ProductContent />
    </ProductProvider>
  )
}

function ProductContent() {
  const queryString = usePrdQueryConfig()
  const { data: productsData, isLoading } = useProductQuery({ queryString })
  const prdList = productsData?.data?.data.data
  const pageController = productsData?.data?.data.meta
  const columns = useProductColumns()

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
              <div className='grid grid-cols-10 gap-2 px-4 py-2 bg-gray-100 text-sm font-semibold'>
                {[
                  'ID',
                  'Tên dịch vụ',
                  'Danh mục',
                  'Giá gốc',
                  'Giảm giá (%)',
                  'Giá sau giảm',
                  'Đánh giá',
                  'Ngày Tạo',
                  'Cập Nhật Lần Cuối',
                  ''
                ].map((text, idx) => (
                  <div key={idx} className='truncate'>
                    {text}
                  </div>
                ))}
              </div>
              {[...Array(10)].map((_, i) => (
                <div key={i} className='grid grid-cols-10 gap-2 px-4 py-3 border-t items-center'>
                  {Array.from({ length: 10 }).map((_, j) => (
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
            ButtonAction={<ProductButtonAction />}
            columns={columns}
            data={prdList || []}
            filterColumn='name'
            DataTablePagination={
              <DataTablePagination
                pageController={pageController}
                path={path.admin.manage.product}
                queryString={queryString}
              />
            }
          />
        )}
      </div>
      <ProductDialog />
    </>
  )
}

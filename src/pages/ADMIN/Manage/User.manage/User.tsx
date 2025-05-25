import { path } from '@/core/constants/path'
import { useUserColumns } from './components/UserColumns'
import DataTable from '@/components/DataTable'
import { UserProvider } from '@/core/contexts/user.context'
import { useUserQuery } from '@/core/queries/user.query'
import { DataTablePagination } from '@/components/DataTable/DataTablePagination'
import { Skeleton } from '@/components/ui/skeleton'
import { UserDialog } from './components/UserDialog'
import { useUserQueryConfig } from '@/hooks/useUserQueryConfig'
import { ROLE_USER } from '@/configs/consts'

export default function User() {
  return (
    <UserProvider>
      <UserContent />
    </UserProvider>
  )
}

function UserContent() {
  const queryString = useUserQueryConfig(ROLE_USER)
  const { data: usersData, isLoading } = useUserQuery({ queryString, role: ROLE_USER })
  const userList = usersData?.data?.data.data
  const pageController = usersData?.data?.data.meta
  const columns = useUserColumns()

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
                  'Tên',
                  'Email',
                  'Số điện thoại',
                  'Địa chỉ',
                  'Giới tính',
                  'Trạng thái',
                  'Ngày tạo',
                  'Cập nhật lần cuối',
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
            // ButtonAction={<UserButtonAction />}
            columns={columns}
            data={userList || []}
            filterColumn='name'
            DataTablePagination={
              <DataTablePagination
                pageController={pageController}
                path={path.admin.manage.user}
                queryString={queryString}
              />
            }
          />
        )}
      </div>
      <UserDialog />
    </>
  )
}

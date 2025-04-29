import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { path } from '@/core/constants/path'
import { AppContext } from '@/core/contexts/app.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { categoryColumns } from './components/CategoryColumns'
import CategoryProvider from '@/core/contexts/category.context'
import DataTable from '@/components/DataTable'
import { CategoryDialog } from './components/CategoryDialog'

import { CategoryButtonAction } from './components/CategoryButtonAction'
export default function Category() {
  const { categories } = useContext(AppContext)

  return (
    <CategoryProvider>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to={path.admin.dashboard}>Trang chủ</Link>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={path.admin._manage}>Quản lý hệ thống</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Danh mục</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
        <DataTable
          buttonAction={<CategoryButtonAction />}
          columns={categoryColumns}
          data={categories || []}
          filterColumn='name'
        />
      </div>
      <CategoryDialog />
    </CategoryProvider>
  )
}

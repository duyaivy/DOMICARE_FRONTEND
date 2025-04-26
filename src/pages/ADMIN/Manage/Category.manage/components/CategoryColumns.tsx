import { Checkbox } from '@/components/ui/checkbox'
import { Category } from '@/models/interface/category.interface'
import { Product } from '@/models/interface/product.interface'
import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { DataTableRowActions } from '@/components/DataTable/DataTableRowAction'
import { cn } from '@/core/lib/utils'

export const categoryColumns: ColumnDef<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div>#{row.getValue('id')}</div>,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Tên danh mục' />,
    cell: ({ row }) => <div className='w-fit text-nowrap max-w-3xs md:max-w-md truncate'>{row.getValue('name')}</div>,
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell bg-white md:bg-transparent '
      )
    },
    enableHiding: true,
    enableSorting: true
  },
  {
    accessorKey: 'products',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Số sản phẩm' />,
    cell: ({ row }) => {
      const length = (row.getValue('products') as Product[]).length
      return <div className=' text-center'>{length}</div>
    },
    meta: {
      className: cn('flex justify-center')
    }
  },
  {
    accessorKey: 'createAt',
    header: () => <div className='text-center capitalize'>Ngày tạo</div>,
    cell: ({ row }) => {
      const date = row.getValue('createAt') as string
      return <div className='text-center'>{date ? new Date(date).toLocaleDateString() : '--'}</div>
    },
    enableHiding: false
  },
  {
    accessorKey: 'updateAt',
    header: () => <div className='text-center capitalize'>Cập nhật lần cuối</div>,
    cell: ({ row }) => {
      const date = row.getValue('updateAt') as string
      return <div className='text-center'>{date ? new Date(date).toLocaleDateString() : '-'}</div>
    },
    enableHiding: false
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    enableHiding: false
  }
]

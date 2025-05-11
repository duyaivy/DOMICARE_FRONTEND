import { Checkbox } from '@/components/ui/checkbox'
import { Category } from '@/models/interface/category.interface'
import { Product } from '@/models/interface/product.interface'
import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { DataTableRowActions } from '@/components/DataTable/DataTableRowAction'
import { cn } from '@/core/lib/utils'
import { useCategories } from '@/core/contexts/category.context'

export const useCategoryColumns = (): ColumnDef<Category>[] => {
  const { setOpen, setCurrentRow } = useCategories()
  return [
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
          'sticky lg:relative left-0 md:table-cell',
          'bg-white lg:bg-inherit',
          'transition-colors duration-200',
          'lg:[.group:hover_&]:!bg-muted',
          'lg:[.group[data-state=selected]_&]:!bg-muted',
          'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none'
        )
      },
      enableHiding: true,
      enableSorting: false
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
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={(row) => {
            setCurrentRow(row)
            setOpen('edit')
          }}
          onDelete={(row) => {
            setCurrentRow(row)
            setOpen('delete')
          }}
        />
      ),

      enableHiding: false
    }
  ]
}

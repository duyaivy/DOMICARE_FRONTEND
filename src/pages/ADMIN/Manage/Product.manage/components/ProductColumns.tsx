import { Checkbox } from '@/components/ui/checkbox'
import { Product } from '@/models/interface/product.interface'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { DataTableRowActions } from '@/components/DataTable/DataTableRowAction'
import { useProducts } from '@/core/contexts/product.context'
import { CategoryMini } from '@/models/interface/category.interface'
import { formatCurrentcy } from '@/utils/formatCurrentcy'
import { cn } from '@/core/lib/utils'

export const useProductColumns = (): ColumnDef<Product>[] => {
  const { setOpen, setCurrentRow } = useProducts()
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
      header: ({ column }) => <DataTableColumnHeader column={column} title='Tên dịch vụ' />,
      cell: ({ row }) => (
        <div className='w-fit  text-nowrap max-w-3xs md:max-w-md truncate'>{row.getValue('name')}</div>
      ),
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
      enableSorting: false
    },
    {
      accessorKey: 'categoryMini',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Danh mục' />,
      cell: ({ row }) => {
        const categoryMini: CategoryMini = row.getValue('categoryMini')

        return <div className='w-fit text-nowrap max-w-3xs md:max-w-md truncate'>{categoryMini?.name}</div>
      },
      enableSorting: false
    },
    {
      accessorKey: 'price',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Giá gốc' />,
      cell: ({ row }) => {
        const price = row.getValue('price') as number
        return <div>{price ? `${formatCurrentcy(price)} VND` : '--'}</div>
      }
    },
    {
      accessorKey: 'discount',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Giảm giá (%)' />,
      cell: ({ row }) => {
        const discount = row.getValue('discount') as number
        return <div className='text-center'>{discount != null ? `${discount}%` : '--'}</div>
      },
      enableSorting: false
    },
    {
      accessorKey: 'priceAfterDiscount',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Giá sau giảm' />,
      cell: ({ row }) => {
        const priceAfter = row.getValue('priceAfterDiscount') as number
        return <div>{priceAfter ? `${formatCurrentcy(priceAfter)} VND` : '--'}</div>
      }
    },
    {
      accessorKey: 'ratingStar',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Đánh giá' />,
      cell: ({ row }) => {
        const rating = row.getValue('ratingStar') as number
        return <div className='text-center'>{rating != null ? rating : '--'}</div>
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

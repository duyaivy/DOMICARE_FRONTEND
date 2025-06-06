import { Checkbox } from '@/components/ui/checkbox'
import { User } from '@/models/interface/user.interface'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { DataTableRowActions } from '@/components/DataTable/DataTableRowAction'
import { useUsers } from '@/core/contexts/user.context'
import { cn } from '@/core/lib/utils'
import { Badge } from '@/components/ui/badge'
import { toFixedNumber } from '@/core/helpers/calculator'

export const useSaleColumns = (): ColumnDef<User>[] => {
  const { setOpen, setCurrentRow } = useUsers()
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
      header: ({ column }) => <DataTableColumnHeader column={column} title='Tên' />,
      cell: ({ row }) => (
        <div className='w-fit text-nowrap max-w-3xs md:max-w-md truncate'>{row.getValue('name') || '--'}</div>
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
      enableSorting: true
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
      cell: ({ row }) => (
        <div className='w-fit text-nowrap max-w-3xs md:max-w-md truncate'>{row.getValue('email')}</div>
      ),
      enableSorting: false
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Số điện thoại' />,
      cell: ({ row }) => (
        <div className='w-fit text-nowrap max-w-3xs md:max-w-md truncate'>{row.getValue('phone') || '--'}</div>
      ),
      enableSorting: false
    },
    {
      accessorKey: 'address',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Địa chỉ' />,
      cell: ({ row }) => (
        <div className='w-fit text-nowrap max-w-3xs md:max-w-md truncate'>{row.getValue('address') || '--'}</div>
      ),
      enableSorting: false
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Giới tính' />,
      cell: ({ row }) => {
        const gender = row.getValue('gender') as string
        return <div className='text-center'>{gender || '--'}</div>
      },
      enableSorting: true
    },
    {
      accessorKey: 'isActive',
      header: () => <div className='text-center capitalize w-full'>Trạng thái</div>,
      cell: ({ row }) => {
        const isActive = row.getValue('isActive') as boolean
        return (
          <div className='text-center'>
            <Badge variant={isActive ? 'default' : 'destructive'}>{isActive ? 'Hoạt động' : 'Chưa kích hoạt'}</Badge>
          </div>
        )
      },
      enableSorting: false
    },
    {
      accessorKey: 'saleTotalBookings',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Tổng tư vấn' />,
      cell: ({ row }) => {
        return <div className='text-center'>{row.getValue('saleTotalBookings')}</div>
      },
      enableSorting: true
    },

    {
      accessorKey: 'saleSuccessPercent',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Tỷ lệ thành công' />,
      cell: ({ row }) => {
        const rate = row.getValue('saleSuccessPercent') as number
        return <div className='text-center'>{rate ? `${toFixedNumber(rate)}%` : '--'}</div>
      },
      enableHiding: false
    },
    {
      accessorKey: 'updateAt',
      header: () => <div className='text-center capitalize'>Cập nhật lần cuối</div>,
      cell: ({ row }) => {
        const date = row.getValue('updateAt') as string
        return <div className='text-center'>{date ? new Date(date).toLocaleDateString() : '--'}</div>
      },
      enableHiding: false
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onView={(row) => {
            setCurrentRow(row)
            console.log('view')
          }}
          onReset={(row) => {
            setCurrentRow(row)
            console.log('reset pass')
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

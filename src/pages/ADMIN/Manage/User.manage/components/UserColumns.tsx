import { Checkbox } from '@/components/ui/checkbox'
import { User } from '@/models/interface/user.interface'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { DataTableRowActions } from '@/components/DataTable/DataTableRowAction'
import { useUsers } from '@/core/contexts/user.context'
import { cn } from '@/core/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ACTIVE_STATUS_USER } from '@/configs/consts'
import React from 'react'
import { Slot } from '@radix-ui/react-slot'

export const useUserColumns = (): ColumnDef<User>[] => {
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
      header: ({ column }) => <DataTableColumnHeader column={column} title='Họ tên' />,
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
            <Badge variant={isActive ? 'default' : 'destructive'}>
              {isActive ? ACTIVE_STATUS_USER.ACTIVE : ACTIVE_STATUS_USER.INACTIVE}
            </Badge>
          </div>
        )
      },
      enableSorting: false
    },
    {
      accessorKey: 'userTotalSuccessBookings',
      header: () => <div className='text-center capitalize w-full'>Đặt thành công</div>,
      cell: ({ row }) => {
        return <div className='text-center'>{row.getValue('userTotalSuccessBookings')}</div>
      },
      enableSorting: true
    },
    {
      accessorKey: 'userTotalFailedBookings',
      header: () => <div className='text-center capitalize w-full'>Đặt thất bại</div>,
      cell: ({ row }) => {
        return <div className='text-center'>{row.getValue('userTotalFailedBookings')}</div>
      },
      enableSorting: true
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

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  { asChild?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp ref={ref} {...props} />
})
SidebarMenuButton.displayName = 'SidebarMenuButton'

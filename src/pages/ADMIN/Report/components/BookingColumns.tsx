import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { DataTableRowActions } from '@/components/DataTable/DataTableRowAction'
import { useBookings } from '@/core/contexts/booking.context'
import { cn } from '@/core/lib/utils'
import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Booking, BookingStatus } from '@/models/interface/booking.interface'
import { User } from '@/models/interface/user.interface'
import { formatCurrentcy } from '@/utils/formatCurrentcy'
import { Product } from '@/models/interface/product.interface'
import { StatusBadge } from '@/components/StatusBadge'
import { isEqual } from 'lodash'
import { Toast } from '@/utils/toastMessage'

export const useBookingColumns = (): ColumnDef<Booking>[] => {
  const { setOpen, setCurrentRow } = useBookings()
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
      accessorKey: 'userDTO',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Khách Hàng' />,
      cell: ({ row }) => {
        const name = (row.getValue('userDTO') as User).name
          ? (row.getValue('userDTO') as User).name
          : (row.getValue('userDTO') as User).email
        return <div className='w-fit text-nowrap max-w-3xs md:max-w-md truncate'>{name}</div>
      },
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
      accessorKey: 'address',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Địa chỉ' />,
      cell: ({ row }) => (
        <div className='w-fit text-nowrap max-w-3xs md:max-w-md truncate'>{row.getValue('address') || '--'}</div>
      ),
      enableSorting: false
    },
    {
      accessorKey: 'totalPrice',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Tổng tiền' />,
      cell: ({ row }) => {
        const totalPrice = row.getValue('totalPrice') as number
        return <div className='text-center'>{formatCurrentcy(totalPrice) || '--'}</div>
      },
      enableSorting: true
    },
    {
      accessorKey: 'bookingStatus',
      header: () => <div className='text-center capitalize w-full'>Trạng thái</div>,
      cell: ({ row }) => {
        const status = row.getValue('bookingStatus') as BookingStatus
        return (
          <div className='text-center'>
            <StatusBadge status={status} />
          </div>
        )
      },
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const statusOrder: Record<BookingStatus, number> = {
          [BookingStatus.PENDING]: 1,
          [BookingStatus.ACCEPTED]: 2,
          [BookingStatus.SUCCESS]: 3,
          [BookingStatus.FAILED]: 4,
          [BookingStatus.CANCELLED]: 5,
          [BookingStatus.REJECTED]: 6
        }
        const statusA = rowA.getValue(columnId) as BookingStatus
        const statusB = rowB.getValue(columnId) as BookingStatus
        return statusOrder[statusA] - statusOrder[statusB]
      },
      filterFn: (row, id, filterValue) => {
        const status = row.getValue(id) as string
        return filterValue.includes(status)
      }
    },
    {
      accessorKey: 'products',
      header: () => <div className='text-center capitalize w-full'>Dịch vụ</div>,
      cell: ({ row }) => {
        const product = (row.getValue('products') as Product[])[0]
        return <div className='text-center'>{product.name || '--'}</div>
      },
      enableSorting: true
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
          onEdit={(row) => {
            if (
              !isEqual(row.bookingStatus, BookingStatus.PENDING) &&
              !isEqual(row.bookingStatus, BookingStatus.ACCEPTED)
            ) {
              Toast.error({ description: 'Không thể chỉnh sửa đơn dịch vụ đã hoàn thành.' })
            } else {
              setCurrentRow(row)
              setOpen('edit')
            }
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

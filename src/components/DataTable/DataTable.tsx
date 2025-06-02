import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { ChevronDown, Search, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cloneElement, ReactElement, ReactNode, useState } from 'react'
import { noPrdImg } from '@/assets/images'
import { DataTablePaginationProps } from './DataTablePagination'
import { DataTableFacetedFilter } from './DataTableFacetedFiler'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}
interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  filterColumn?: keyof T
  fillterName?: string
  isBooking?: boolean
  ButtonAction?: ReactNode
  DataTablePagination?: ReactElement<DataTablePaginationProps<any, T>>
}

export function DataTable<T>({
  data,
  columns,
  filterColumn,
  fillterName,
  isBooking,
  ButtonAction,
  DataTablePagination
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    enableMultiSort: true,
    enableFilters: true
  })

  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <div className='w-full'>
      {filterColumn && (
        <div className='flex items-center py-3 gap-2 flex-col md:flex-row'>
          <Input
            placeholder={`Tìm kiếm ${fillterName || String(filterColumn)}...`}
            value={(table.getColumn(filterColumn as string)?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn(filterColumn as string)?.setFilterValue(event.target.value)}
            className='w-full md:w-auto block'
            classNameInput={'w-full md:w-auto '}
            icon={<Search />}
          />
          <div className='flex w-full justify-between'>
            {ButtonAction}
            {isBooking && (
              <div className='flex items-center gap-2'>
                {table.getColumn('bookingStatus') && (
                  <DataTableFacetedFilter
                    column={table.getColumn('bookingStatus')}
                    title='Trạng thái'
                    options={[
                      { label: 'Chờ xác nhận', value: 'PENDING' },
                      { label: 'Đang tư vấn', value: 'ACCEPTED' },
                      { label: 'Thành công', value: 'SUCCESS' },
                      { label: 'Thất bại', value: 'FAILED' },
                      { label: 'Bị từ chối', value: 'REJECTED' }
                    ]}
                  />
                )}
                {isFiltered && (
                  <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
                    Xóa bộ lọc
                    <XCircle className='ml-2 h-4 w-4' />
                  </Button>
                )}
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='ml-auto'>
                  Hiển thị <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>{' '}
        </div>
      )}
      <div className='rounded-md overflow-hidden border border-neutral-900'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className ?? ''}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getCoreRowModel().rows?.length ? (
              table.getCoreRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='group/row'>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.columnDef.meta?.className ?? ''}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  <div className='flex flex-col justify-center items-center pt-5'>
                    <img className='w-auto h-32' src={noPrdImg} alt='no_product' />
                    <p className='text-black text-center py-4'>Danh mục trống</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {DataTablePagination && cloneElement(DataTablePagination, { table })}
    </div>
  )
}

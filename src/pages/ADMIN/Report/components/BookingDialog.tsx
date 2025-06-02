import { DeleteDialog } from '@/components/DataTable/DeleteDialog'
import { ADMIN_STATUS, BookingDialogType } from '@/configs/consts'
import { isEqual } from 'lodash'
import { BookingActionDialog } from './BookingActionDialog'
import { useBookingDelete } from '@/core/queries/booking.query'
import { useBookings } from '@/core/contexts/booking.context'
export function BookingDialog() {
  const { open, setOpen, currentRow, setCurrentRow } = useBookings()
  const bookingDelMutation = useBookingDelete()

  return (
    <>
      {currentRow && (
        <>
          <BookingActionDialog
            key={`Booking-edit-${currentRow.id}`}
            open={isEqual(open, ADMIN_STATUS.EDIT)}
            onOpenChange={() => {
              setOpen(ADMIN_STATUS.EDIT as BookingDialogType)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <DeleteDialog
            key={`Booking-delete-${currentRow.id}`}
            open={isEqual(open, ADMIN_STATUS.DELETE)}
            onOpenChange={() => {
              setOpen(ADMIN_STATUS.DELETE as BookingDialogType)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentItem={currentRow}
            displayField='address'
            titleLabel='lịch hẹn'
            getId={(c) => c.id as number}
            onDelete={(id) => bookingDelMutation.mutate(Number(id))}
          />
        </>
      )}
    </>
  )
}

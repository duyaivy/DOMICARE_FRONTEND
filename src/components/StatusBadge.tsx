import { Badge } from '@/components/ui/badge'
import { BookingStatus } from '@/models/interface/booking.interface'
import { cn } from '@/core/lib/utils'

interface StatusBadgeProps {
  status: BookingStatus
  className?: string
}

const statusColors = {
  [BookingStatus.PENDING]: '#FFA000',
  [BookingStatus.REJECTED]: '#F57C00',
  [BookingStatus.SUCCESS]: '#2E7D32',
  [BookingStatus.FAILED]: '#C62828',
  [BookingStatus.ACCEPTED]: '#1565C0'
}

const statusLabels = {
  [BookingStatus.PENDING]: 'Chờ xác nhận',
  [BookingStatus.REJECTED]: 'Bị từ chối',
  [BookingStatus.SUCCESS]: 'Thành công',
  [BookingStatus.FAILED]: 'Thất bại',
  [BookingStatus.ACCEPTED]: 'Đang tư vấn'
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      className={cn('text-white ', className)}
      style={{
        backgroundColor: statusColors[status]
      }}
    >
      {statusLabels[status]}
    </Badge>
  )
}

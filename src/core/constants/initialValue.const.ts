import { QueryCateConfig } from '@/hooks/useCateQueryConfig'
import { Review } from '@/models/interface/review.interface'
import { Activity, ShoppingCart, Users } from 'lucide-react'
import { DollarSign } from 'lucide-react'

export const initialComment = {
  comment:
    'Tôi năm nay hơn 20 tuổi mà tôi chừa gặp cái dịch vụ nào mà nó như thế này cả, phải tôi tôi book cho mấy phát.',
  address: ' Hoà Khánh',
  avatar: 'https://github.com/shadcn.png',
  gender: 'OTHER',
  name: 'Trung Ánh',
  rating: 5
}
export const initialReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    comment:
      'Ban đầu tôi cũng hơi ngại gọi dịch vụ vì sợ làm qua loa, nhưng mà sau khi trải nghiệm thì đúng là khác biệt. Nhân viên đến đúng giờ, dọn dẹp kỹ càng từng góc, kể cả những chỗ mình không nghĩ tới. Sẽ giới thiệu cho bạn bè dùng thử.',
    createAt: '2025-04-15T00:00:00Z',
    updateAt: undefined,
    createBy: 'Nhung Phan',
    updateBy: undefined,
    userId: 101,
    productId: 1001
  },
  {
    id: 2,
    rating: 5,
    comment:
      'Bình thường tôi tự dọn nhưng bận quá nên thử đặt dịch vụ xem sao, ai ngờ thành khách quen luôn. Đồ đạc được lau chùi kỹ, sàn nhà sạch bong kin kít, kể cả mấy cái góc khuất cũng không bỏ sót +1 cho sốp.',
    createAt: '2025-04-15T00:00:00Z',
    updateAt: undefined,
    createBy: 'Tô Loan',
    updateBy: undefined,
    userId: 102,
    productId: 1001
  },
  {
    id: 3,
    rating: 5,
    comment:
      'Từ ngày biết đến dịch vụ bên DomiCare, tôi không còn bị Vợ chích điện à nhầm, Vợ yêu thương vì dọn dẹp không sạch nữa. Cảm ơn dịch vụ rất nhiều.',
    createAt: '2025-04-15T00:00:00Z',
    updateAt: undefined,
    createBy: 'Dách',
    updateBy: undefined,
    userId: 103,
    productId: 1001
  }
]

export const initialChangePW = {
  oldPassword: '',
  confirmPassword: '',
  newPassword: ''
}
export const initialParams: QueryCateConfig = {
  page: '1',
  size: '10'
}
export const discountValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 99, 100]

export const tableLoadingData = {
  product: [
    'ID',
    'Tên dịch vụ',
    'Danh mục',
    'Giá gốc',
    'Giảm giá (%)',
    'Giá sau giảm',
    'Đánh giá',
    'Ngày Tạo',
    'Cập Nhật Lần Cuối',
    ''
  ],
  category: ['ID', 'Tên danh mục', 'Số sản phẩm', 'Ngày Tạo', 'Cập Nhật Lần Cuối']
}

export const initialSaleOverview = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@example.com',
    avatar: '/avatars/01.png',
    ratio: 78,
    amount: 12063450
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@example.com',
    avatar: '/avatars/02.png',
    amount: 12063450,
    ratio: 98
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@example.com',
    avatar: '/avatars/03.png',
    amount: 1934900,
    ratio: 98
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'william.kim@example.com',
    avatar: '/avatars/04.png',
    amount: 1278600,
    ratio: 98
  }
]

export const initialRevenueOverviewChart = [
  { month: 'Th 1', revenue: 4000 },
  { month: 'Th 2', revenue: 3000 },
  { month: 'Th 3', revenue: 5000 },
  { month: 'Th 4', revenue: 4000 },
  { month: 'Th 5', revenue: 7000 },
  { month: 'Th 6', revenue: 6000 },
  { month: 'Th 7', revenue: 4000 },
  { month: 'Th 8', revenue: 4000 },
  { month: 'Th 9', revenue: 12000 },
  { month: 'Th 10', revenue: 9560 },
  { month: 'Th 11', revenue: 8000 },
  { month: 'Th 12', revenue: 6000 }
]
export const initialMetricsOverview = [
  {
    title: 'Doanh Thu',
    value: '4523189',
    change: '+20.1%',
    icon: DollarSign
  },
  {
    title: 'Đơn Đặt Hàng',
    value: '2350',
    change: '+15.1%',
    icon: ShoppingCart
  },
  {
    title: 'Khách Hàng Mới',
    value: '573',
    change: '+201 từ tháng trước',
    icon: Users
  },
  {
    title: 'Lượt Đánh Giá',
    value: '-4.67',
    change: '-5.4% so với tháng trước',
    icon: Activity
  }
]

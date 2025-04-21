import { Review } from '@/models/interface/review.interface'

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

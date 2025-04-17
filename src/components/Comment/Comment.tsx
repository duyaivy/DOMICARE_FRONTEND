import { Review } from '@/models/interface/review.interface'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import CommentItem from './CommentItem'
import { Fragment } from 'react/jsx-runtime'
import classNames from 'classnames'
import { isEqual } from 'lodash'
import { numberConstants } from '@/configs/consts'
interface CommentProps {
  reviews?: Review[]
}
const initialValue: Review[] = [
  {
    id: 1,
    rating: 5,
    comment:
      'Ban đầu tôi cũng hơi ngại gọi dịch vụ vì sợ làm qua loa, nhưng mà sau khi trải nghiệm thì đúng là khác biệt. Nhân viên đến đúng giờ, dọn dẹp kỹ càng từng góc, kể cả những chỗ mình không nghĩ tới. Sẽ giới thiệu cho bạn bè dùng thử.',
    createAt: '2025-04-15T00:00:00Z',
    updateAt: null,
    createBy: 'Nhung Phan',
    updateBy: null,
    userId: 101,
    productId: 1001
  },
  {
    id: 2,
    rating: 5,
    comment:
      'Bình thường tôi tự dọn nhưng bận quá nên thử đặt dịch vụ xem sao, ai ngờ thành khách quen luôn. Đồ đạc được lau chùi kỹ, sàn nhà sạch bong kin kít, kể cả mấy cái góc khuất cũng không bỏ sót +1 cho sốp.',
    createAt: '2025-04-15T00:00:00Z',
    updateAt: null,
    createBy: 'Tô Loan',
    updateBy: null,
    userId: 102,
    productId: 1001
  },
  {
    id: 3,
    rating: 5,
    comment:
      'Từ ngày biết đến dịch vụ bên DomiCare, tôi không còn bị Vợ chích điện à nhầm, Vợ yêu thương vì dọn dẹp không sạch nữa. Cảm ơn dịch vụ rất nhiều.',
    createAt: '2025-04-15T00:00:00Z',
    updateAt: null,
    createBy: 'Dách',
    updateBy: null,
    userId: 103,
    productId: 1001
  }
]
export default function Comment({ reviews = initialValue }: CommentProps) {
  const isOneItem = isEqual(reviews.length, numberConstants.ONE)
  console.log(reviews.length)
  return (
    <Fragment>
      {reviews && reviews.length > 0 && (
        <Carousel
          autoChange={true}
          autoChangeInterval={10000}
          opts={{
            align: 'start'
          }}
          className='w-full'
        >
          <CarouselContent className='flex items-center py-2'>
            {reviews.map((item) => (
              <CarouselItem className={classNames(' flex items-center justify-center', { 'md:basis-1/2': !isOneItem })}>
                <CommentItem
                  address={item.updateAt || ''}
                  avatar={item.createAt}
                  gender={true}
                  comment={item.comment}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </Fragment>
  )
}

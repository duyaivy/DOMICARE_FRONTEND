import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import CommentItem from './CommentItem'

export default function Comment() {
  return (
    <Carousel
      autoChange={true}
      autoChangeInterval={3000}
      opts={{
        align: 'start'
      }}
      className='w-full max-w-[250px] md:max-w-[650px] lg:max-w-[920px]'
    >
      <CarouselContent className='flex items-center'>
        <CarouselItem className='md:basis-1/2'>
          <CommentItem
            address='Đô thị FPT'
            gender={false}
            avatar='https://afamilycdn.com/150157425591193600/2020/11/6/6519572620660129303588886256713807679193088n-16046297754661089788862.jpg'
            comment='Ban đầu tôi cũng hơi ngại gọi dịch vụ vì sợ làm qua loa, nhưng mà sau khi trải nghiệm thì đúng là khác biệt. Nhân viên đến đúng giờ, dọn dẹp kỹ càng từng góc, kể cả những chỗ mình không nghĩ tới. Sẽ giới thiệu cho bạn bè dùng thử.'
            name='Nhung Phan'
          />
        </CarouselItem>
        <CarouselItem className='md:basis-1/2'>
          <CommentItem
            address='Hải Châu'
            gender={false}
            avatar='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2meZ_O6B-xwMwW6mW78-XovrxuqkIHlWb8A&s'
            comment='Bình thường tôi tự dọn nhưng bận quá nên thử đặt dịch vụ xem sao, ai ngờ thành khách quen luôn. Đồ đạc được lau chùi kỹ, sàn nhà sạch bong kin kít, kể cả mấy cái góc khuất cũng không bỏ sót +1 cho sốp.'
            name='Tô Loan'
          />
        </CarouselItem>
        <CarouselItem className='md:basis-1/2'>
          <CommentItem
            address='Khu tự trị Campuchia'
            gender={true}
            avatar='https://lh3.googleusercontent.com/-40iPf1W2LD4/Ye7JAsyQk0I/AAAAAAAAAyw/1UjXEeWOKMAv7sxdB0Y1XsHq9mSHYfERQCNcBGAsYHQ/s0/jack7.png'
            comment='Từ ngày biết đến dịch vụ bên DomiCare, tôi không còn bị Vợ chích điện à nhầm, Vợ yêu thương vì dọn dẹp không sạch nữa. Cảm ơn dịch vụ rất nhiều.'
            name='Dách'
          />
        </CarouselItem>
        <CarouselItem className='md:basis-1/2'>
          <CommentItem />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

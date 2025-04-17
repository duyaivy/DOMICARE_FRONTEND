import RatingStars from '../RatingStars/RatingStars'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
interface CommentItemProps {
  comment?: string
  gender?: boolean
  avatar?: string
  address?: string
  name?: string
  rating?: number
}
export default function CommentItem(props: CommentItemProps) {
  const {
    comment = 'Tôi năm nay hơn 20 tuổi mà tôi chừa gặp cái dịch vụ nào mà nó như thế này cả, phải tôi tôi book cho mấy phát.',
    address = ' Hoà Khánh',
    avatar = 'https://github.com/shadcn.png',
    gender = true,
    name = 'Trung Ánh',
    rating = 5
  } = props
  return (
    <div className='bg-white p-6 rounded-lg  border border-gray-200 shadow-md min-h-72 md:min-h-64 flex justify-center flex-col'>
      <p className='text-gray text-base mb-4 text-justify italic'>"{comment}"</p>
      <div className='flex items-center space-x-4'>
        <Avatar className='!size-10'>
          <AvatarImage src={avatar} className='w-full h-full object-cover' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <RatingStars rating={rating} />
          <h3 className='text-lg font-semibold text-black'>{(gender ? 'Anh ' : 'Chị ') + name} </h3>
          <p className='text-sm text-gray'>{address}</p>
        </div>
      </div>
    </div>
  )
}

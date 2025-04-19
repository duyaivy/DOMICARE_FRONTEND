import { Review } from '@/models/interface/review.interface'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import CommentItem from './CommentItem'
import { Fragment } from 'react/jsx-runtime'
import classNames from 'classnames'
import { isEqual } from 'lodash'
import { numberConstants } from '@/configs/consts'
import { initialReviews } from '@/core/constants/initialValue.const'
interface CommentProps {
  reviews?: Review[]
}

export default function Comment({ reviews = initialReviews }: CommentProps) {
  const isOneItem = isEqual(reviews.length, numberConstants.ONE)
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
          <CarouselContent className='flex items-center py-2 '>
            {reviews.map((item) => (
              <CarouselItem className={classNames(' flex items-center justify-center', { 'lg:basis-1/2': !isOneItem })}>
                <CommentItem
                  address={item.userDTO?.address || ''}
                  avatar={item.userDTO?.avatar}
                  name={item.userDTO?.name}
                  gender={'MALE'}
                  comment={item.comment}
                  className={isOneItem ? 'w-xl' : ''}
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

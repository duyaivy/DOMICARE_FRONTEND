import React, { useContext, useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { isEqual } from 'lodash'
import { useMutation } from '@tanstack/react-query'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import { reviewApi } from '@/core/services/review.service'
import { AppContext } from '@/core/contexts/app.context'
import { Toast } from '@/utils/toastMessage'
import { AxiosError } from 'axios'
interface WriteReviewProps {
  productId: number
}
export default function WriteReview({ productId }: WriteReviewProps) {
  const { profile } = useContext(AppContext)
  const [review, setReview] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const reviewMutation = useMutation({
    mutationKey: mutationKeys.review,
    mutationFn: profile ? reviewApi.post : reviewApi.postUnlogin
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const dataApi = {
        rating: rating,
        comment: review,
        productId: productId
      }
      setIsLoading(true)
      const { data } = await reviewMutation.mutateAsync(dataApi)
      Toast.success({ title: 'Đánh giá thành công', description: data.message })
      setReview('')
      setRating(0)
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      Toast.error({ title: 'Lỗi', description: err.response?.data?.message || err.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className='w-full   p-6 bg-white  space-y-4 z-10'>
      <h3 className='text-xl font-semibold'>Viết đánh giá về dịch vụ</h3>

      <Textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder='Chia sẻ trải nghiệm của bạn...'
        className='w-full h-24 p-3 border-gray-200 placeholder:text-black'
        required
      />

      <div className='flex items-center gap-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className={`cursor-pointer ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <Button
        type='submit'
        loading={isLoading}
        className=' text-white px-4 w-full rounded-md capitalize text-base cursor-pointer h-12 bg-main py-3 hover:bg-main/80 duration-300 hover:shadow-lg'
        disabled={isEqual(rating, 0)}
      >
        Gửi đánh giá
      </Button>
    </form>
  )
}

import { devlopment } from '@/assets/images'

export default function ComingSoon() {
  return (
    <div className='flex flex-col items-center justify-center h-[90vh] p-8 text-center'>
      <img src={devlopment} alt='Đang phát triển' className='max-w-5xl h-auto' />
      <h1 className='text-2xl font-bold mb-2'>Tính năng này đang được phát triển</h1>
      <p className='text-gray-600'>Chúng tôi đang làm việc để mang đến trải nghiệm tốt nhất cho bạn.</p>
    </div>
  )
}

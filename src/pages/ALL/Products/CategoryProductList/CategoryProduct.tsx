import { pic12 } from '@/assets/images'
import Pagination from '@/components/Pagination'
import Product from '@/components/Product'
import { path } from '@/core/constants/path'

export default function CategoryProductList({ title, number }: { title: string; number: number }) {
  return (
    <div className='bg-white rounded-2xl p-4 pt-0 '>
      <h2 className='text-head capitalize py-4'>{title}</h2>
      <div className='w-full grid grid-cols-12 gap-3 md:gap-4 '>
        {Array(number)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index} className='col-span-6 lg:col-span-4 '>
                <Product
                  id={'1'}
                  title='Nhân viên vệ sinh theo giờ'
                  description='Nhân viên sẽ vệ sinh theo khung giờ Khách hàng đăng ký khi phát sinh nhu cầu.'
                  img={pic12}
                />
              </div>
            )
          })}
      </div>
      <div className='flex items-center justify-center'>
        <Pagination pageSize={10} path={path.products} queryString={{ page: '1', limit: '10', name: 'abe' }} />
      </div>
    </div>
  )
}

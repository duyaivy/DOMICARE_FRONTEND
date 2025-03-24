import CategoryList from './CategoryList'
import Search from '@/components/Search'
import CategoryProductList from './CategoryProductList'

export default function Products() {
  return (
    <div className='bg-bg md:pt-25 '>
      <div className='max-w-7xl mx-auto p-4'>
        <Search />
        <div className='grid grid-cols-12 gap-3 lg:gap-6 p'>
          <div className=' col-span-12 md:col-span-3 w-full'>
            <CategoryList />
          </div>
          <div className='col-span-12 md:col-span-9 space-y-6 mb-4'>
            <CategoryProductList number={3} title={'Dịch vụ hot'} />
            <CategoryProductList number={10} title={'Có thể bạn sẽ thích'} />
            <CategoryProductList number={10} title={'Dịch vụ Lỏ'} />
          </div>
        </div>
      </div>
    </div>
  )
}

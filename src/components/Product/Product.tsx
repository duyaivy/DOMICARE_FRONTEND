import { IconArrowRight } from '@/assets/icons/icon-arrow'
import { IconStar } from '@/assets/icons/icon-star'
import { path } from '@/core/constants/path'
import { Product as ProductType } from '@/models/interface/product.interface'
import { urlSEO } from '@/utils/urlSEO'

import { Link } from 'react-router-dom'

export default function Product({ product }: { product: ProductType }) {
  return (
    <div className='rounded-xs shadow w-full flex  flex-col gap-3  pt-0 group hover:shadow-xl hover:translate-y-[-5px] duration-300'>
      <Link
        to={`${path.product}/${urlSEO(product.id.toString(), product.name)}`}
        className='w-full h-40 sm:h-55 group relative'
      >
        <img className='w-full h-full object-center object-cover' src={product.image} alt={product.name} />
        <div className='absolute inset-0 bg-gray-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300'></div>
      </Link>
      <div className='flex flex-col  h-35 px-3 mb-4 cursor-default'>
        <h3 className='text-black text-sub0 font-semibold line-clamp-2'>{product.name}</h3>
        <p className='text-gray text-sub2 text-justify grow line-clamp-3 mt-1 '>{product.description}</p>
        <p className='text-red text-sub2 text-justify grow line-clamp-3 mt-1 '>Giảm giá {product.discount}%</p>

        <div className='flex justify-between items-center'>
          <Link className='flex items-center gap-2' to={path.products}>
            <p className='text-left text-blue text-sub1 pt-0.5 cursor-pointer'>Tìm hiểu</p>
            <IconArrowRight className='fill-blue' />
          </Link>
          <div className='flex items-center gap-1'>
            <p className='text-lg'>{product.ratingStar}</p>
            <IconStar />
          </div>
        </div>
      </div>
    </div>
  )
}

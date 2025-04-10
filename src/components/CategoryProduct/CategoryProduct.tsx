import { Category } from '@/models/interface/category.interface'

import { Link } from 'react-router-dom'

export default function CategoryProduct(category: Category) {
  return (
    <div>
      <div className='rouded-xs shadow w-full flex  flex-col gap-3  pt-0 group hover:shadow-xl hover:translate-y-[-5px] duration-300'>
        <Link to={category.title} className='w-full h-55 group relative'>
          <img className='w-full h-full object-cover' src={category.img} alt={category.title} />
          <div className='absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300'></div>
        </Link>
        <div className='flex flex-col  h-35 px-3 mb-4 cursor-default'>
          <h3 className='text-black text-sub0 font-semibold line-clamp-2'>{category.title}</h3>
          <p className='text-gray text-sub2 text-justify grow line-clamp-3 mt-1 '>{category.description}</p>
          <Link to={category.title}>
            <p className='text-left text-blue text-sub1 pt-0.5 cursor-pointer'>Tìm hiểu</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

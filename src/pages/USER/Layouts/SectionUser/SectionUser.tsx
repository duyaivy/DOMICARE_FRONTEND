import { ReactNode } from 'react'
interface Props {
  children: ReactNode
  title: string
  description: string
}
export default function SectionUser({ children, title, description }: Props) {
  return (
    <section className='bg-white shadow-2xs rounded-sm  px-6 py-5'>
      <div className='border-b border-b-gray-200 py-4'>
        <h2 className='text-lg text-black capitalize text-left'>{title}</h2>
        <p className='text-gray text-sm text-left'>{description}</p>
      </div>
      {children}
    </section>
  )
}

import { cn } from '@/core/lib/utils'
import React from 'react'
interface Props {
  children: React.ReactNode
  className?: string
}
export default function SectionBgGreen({ children, className }: Props) {
  return (
    <section className='bg-bg min-h-80 flex items-center'>
      <div className={cn('max-w-7xl mx-auto p-4', className)}>{children}</div>
    </section>
  )
}

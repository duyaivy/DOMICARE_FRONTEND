import { cn } from '@/core/lib/utils'
import React from 'react'
interface Props {
  children: React.ReactNode
  className?: string
}
export default function SectionBgWhite({ children, className }: Props) {
  return (
    <section className={'bg-white min-h-96 flex items-center'}>
      <div className={cn('max-w-7xl mx-auto p-4', className)}>{children}</div>
    </section>
  )
}

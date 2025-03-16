import React from 'react'
import SecctionInView from '../SecctionInView'
import { cn } from '@/core/lib/utils'
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description?: string
  classNameContainer?: string
}
export default function FeatureCard({ icon, title, description, classNameContainer }: FeatureCardProps) {
  return (
    <SecctionInView className={cn([classNameContainer, ' flex flex-col items-center justify-start sm:basis-1/3  '])}>
      {icon}
      <div className='p-4 rounded-md flex items-start space-x-4'>
        <div>
          <h3 className='text-sub1 text-black font-semibold text-center my-2'>{title}</h3>
          {description && <p className='text-gray text-sm text-justify'>{description}</p>}
        </div>
      </div>
    </SecctionInView>
  )
}

import { Header } from '@/components'
import Footer from '@/components/Footer'
import { Fragment, ReactNode } from 'react'

interface CustomerLayoutProps {
  children?: ReactNode
}
export default function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  )
}

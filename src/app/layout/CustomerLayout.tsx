import { Header } from '@/components'
import Footer from '@/components/Footer'
import { path } from '@/core/constants/path'
import { AppContext } from '@/core/contexts/app.context'
import { useBookingQueryConfig } from '@/hooks/useBookingQueryConfig'
import { useBookingWebSocket } from '@/hooks/useBookingWebSocket'
import { Fragment, ReactNode, useContext } from 'react'

interface CustomerLayoutProps {
  children?: ReactNode
}
export default function CustomerLayout({ children }: CustomerLayoutProps) {
  const { profile } = useContext(AppContext)
  // realtime
  const queryString = useBookingQueryConfig({ userId: profile?.id })
  const memoizedQueryKey = [path.user.history, queryString]
  useBookingWebSocket({ queryKey: memoizedQueryKey, isUser: true, userId: profile?.id })
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  )
}

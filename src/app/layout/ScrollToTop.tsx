import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export default function ScrollToTop({ children }: Props) {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return <>{children}</>
}

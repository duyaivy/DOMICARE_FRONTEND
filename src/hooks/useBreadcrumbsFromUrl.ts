import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getBreadcrumbsFromUrl } from '@/utils/getBreadcrumbsFromUrl'
import { useBreadcrumbs } from '@/contexts/breadcrumbs.context'

export const useBreadcrumbsFromUrl = () => {
  const location = useLocation()
  const { setBreadcrumbs } = useBreadcrumbs()

  useEffect(() => {
    const breadcrumbs = getBreadcrumbsFromUrl(location.pathname)
    setBreadcrumbs(breadcrumbs)
  }, [location.pathname, setBreadcrumbs])
}

import { DashboardListConfig } from '@/models/interface/dashboard.interface'
import { useParamsString } from './usePrdQueryConfig'
import { isUndefined, omitBy } from 'lodash'
import { addDays } from 'date-fns'
import { useMemo } from 'react'

export type OverviewQueryConfig = {
  [key in keyof DashboardListConfig]: string
}
export function useOverviewQueryConfig() {
  const queryString: OverviewQueryConfig = useParamsString()
  const queryParams: OverviewQueryConfig = useMemo(() => {
    return omitBy(
      {
        startDate: queryString.startDate || addDays(new Date(), -30).toISOString(),
        endDate: queryString.endDate || new Date().toISOString()
      },
      isUndefined
    )
  }, [queryString.startDate, queryString.endDate])
  return queryParams
}
